import Foundation
import React

@objc(YeterNative)
class YeterNative: RCTEventEmitter {
  
    public static var shared:YeterNative?
    private let userDefaults = UserDefaults(suiteName: "group.com.ozkokdev.yeter.appgroup")!

    override init() {
        super.init()
        YeterNative.shared = self
    }

    @objc(addWord:withResolver:withRejecter:)
    func addWord(word: NSString, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        var wordsList = userDefaults.array(forKey: "words") as? [String] ?? []
        wordsList.append(word as String)
        userDefaults.set(wordsList, forKey: "words")
        resolve(wordsList)
    }

    @objc(getWords:withRejecter:)
    func getWords(resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        let wordsList = userDefaults.array(forKey: "words") as? [String] ?? []
        resolve(wordsList)
    }

    @objc(removeWord:withResolver:withRejecter:)
    func removeWord(word: NSString, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        var wordsList = userDefaults.array(forKey: "words") as? [String] ?? []
        wordsList.removeAll { $0 == word as String }
        userDefaults.set(wordsList, forKey: "words")
        resolve(wordsList)
    }
}
