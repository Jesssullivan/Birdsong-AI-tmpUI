//
//  ContentView.swift
//  afgsfgasdfadsg
//
//  Created by Jess on 10/1/20.
//

import SwiftUI

private func vLog(text: String) -> String {
    //TODO: vLog: add OSLog components
    // this is surely not how this is done...idk
    NSLog("vLog: " + text)
    print("vLog: " + text)
    return "ca/sdfaslkj"
}

struct ContentView: View {
    var body: some View {
        VStack {
            Text(vLog(text: "Dodsfads"))
            Text("Hello, world!")
                .padding()

        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
