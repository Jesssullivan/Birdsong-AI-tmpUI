import SwiftUI
import AVKit
import AVFoundation
import Accelerate

//MARK: - private

/// extra verbose logging to console from View & global env
private func vLog(text: String) -> Void {
    //TODO: vLog: add OSLog components
    // this is surely not how this is done...idk
    print("vLog: " + text)
}

/// generate new file names:
private func newFileName(hLength: Int? = nil, ext:String? = nil) -> String {

    // use hour+minute time & hash string to name record file names
    let dFormatter = DateFormatter()
    dFormatter.dateFormat = "_hh:mma" // "a" prints "pm" or "am"
    
    // date string:
    let dString = dFormatter.string(from: Date()) // "12 AM"
    
    // hash string length default:
    let length = hLength ?? 6;
    
    // hash string chars:
    let letters = "abcdefghijklmnopqrstuvwxyz"
    let hString = String((0..<length).map{ _ in letters.randomElement()! })
    
    // file extension:
    let nExt = ext ?? ".wav";
    
    // return the new file name:
    // vLog(text: "@newFileName created: " + hString + dString + nExt)
    return hString + dString + nExt
    
}


private func getStaticWav(staticName: String?) {
    
    // default testing .wav file name:
    var staticFileName = "FullSongRecording.wav";

    // file name passed as argument?
    staticFileName = staticName ?? "FullSongRecording.wav";

    // go get the static file form bundle:
    if let documentsDirectory = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).last {
        let fileURL = documentsDirectory.appendingPathComponent(staticFileName)
        do {
            // make sure we've actually got the file:
            if try fileURL.checkResourceIsReachable() {
                vLog(text: "get staticFileName @ " + fileURL.absoluteString)
                // we've now got the file, now to parse as a Array:
                
                
            // error handling-
            } else {
                vLog(text: "staticFileName @ " + fileURL.absoluteString + "does not exist")
                do {
                    vLog(text: "attempting write @ " + fileURL.absoluteString)
                    try Data().write(to: fileURL)
                    
                } catch {
                    vLog(text: "an write @ " + fileURL.absoluteString + "failed... :(")
                   }
               }
           } catch {
            vLog(text: "an error happened while checking for the file")
           }
    }
}



func getLocalWavFS(url: URL) -> Array<Any> {
    
    // use Apple's AVFoundation to import the audio:
    do {
        
        let file = try AVAudioFile(forReading: url)
        // _ = Logger(text: "Received Sample Rate: " + String(file.fileFormat.sampleRate))
        // _ = Logger(text: "Received Channel Count: " + String(file.fileFormat.channelCount))
        
        // Immediately unwrap:
        guard let format = AVAudioFormat(
                commonFormat: .pcmFormatFloat32,
                sampleRate: file.fileFormat.sampleRate,
                channels: 1,
                interleaved: false) else {
            return []
        }
        
        // todo: how can frameCapacity be calculated on the fly?
        let buf = AVAudioPCMBuffer(pcmFormat: format, frameCapacity: 200000 )
        
        try! file.read(into: buf!)
        let wavformArray = Array(UnsafeBufferPointer(start: buf?.floatChannelData?[0], count:Int(buf!.frameLength)))
        
        return wavformArray
    } catch {
        //print("toast")
        return []
    }
}

struct ContentView: View {
    var body: some View {
        VStack {
            Text("Yuki the chonky seal")
            Text(newFileName())
            Text(newFileName(hLength:22, ext:".veryBig"))
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
