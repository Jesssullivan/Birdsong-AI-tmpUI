//
//  ContentView.swift
//  tmpui.1.1
//
//  Created by Jess on 9/19/20.
//

import SwiftUI
import TensorFlowLiteC

func Logger(text: String) -> String {
    print(text)
    return text
}

struct ContentView: View {
    var body: some View {
        Text("Hello, world!")
            .padding()
    }
    let l = Logger(text: "hi")
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
