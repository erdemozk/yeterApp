import IdentityLookup;

final class MessageFilterExtension: ILMessageFilterExtension {}

// var words = [
//   "bet",
//   "vegas",
//   "freespin",
//   "bonanza", 
//   "sweet", 
//   "free", 
//   "spin", 
//   "dice", 
//   "betvip", 
//   "aviator", 
//   "hediyebonus", 
//   "cutt.ly",
//   "14aff.com",
//   "bahsin",
//   "bahis",
//   "slot",
//   "tinyurl.com",
//   "casino",
//   "discount",
//   "istek.me",
//   "istekbet.site",
//   "liongiris.com",
//   "rebrand.ly"
// ];

extension MessageFilterExtension: ILMessageFilterQueryHandling, ILMessageFilterCapabilitiesQueryHandling {
    func handle(_ capabilitiesQueryRequest: ILMessageFilterCapabilitiesQueryRequest, context: ILMessageFilterExtensionContext, completion: @escaping (ILMessageFilterCapabilitiesQueryResponse) -> Void) {
        let response = ILMessageFilterCapabilitiesQueryResponse()
        completion(response)
    }

    func handle(_ queryRequest: ILMessageFilterQueryRequest, context: ILMessageFilterExtensionContext, completion: @escaping (ILMessageFilterQueryResponse) -> Void) {
        let (offlineAction, offlineSubAction) = self.offlineAction(for: queryRequest)

        switch offlineAction {
        case .allow, .junk, .promotion, .transaction:
            let response = ILMessageFilterQueryResponse()
            response.action = offlineAction
            response.subAction = offlineSubAction

            completion(response)

        case .none:
            context.deferQueryRequestToNetwork() { (networkResponse, error) in
                let response = ILMessageFilterQueryResponse()
                response.action = .none
                response.subAction = .none

                if let networkResponse = networkResponse {
                    (response.action, response.subAction) = self.networkAction(for: networkResponse)
                } else {
                    NSLog("Error deferring query request to network: \(String(describing: error))")
                }

                completion(response)
            }

        @unknown default:
            break
        }
    }

    private func offlineAction(for queryRequest: ILMessageFilterQueryRequest) -> (ILMessageFilterAction, ILMessageFilterSubAction) {
        guard let userDefaults = UserDefaults(suiteName: "group.com.ozkokdev.yeter.appgroup"),
            let words = userDefaults.array(forKey: "words") as? [String],
            let messageBody = queryRequest.messageBody?.lowercased() else {
            return (.none, .none)
        }

        for word in words {
            if messageBody.contains(word.lowercased()) {
                return (.junk, .none)
            }
        }

        return (.allow, .none)
    }

    private func networkAction(for networkResponse: ILNetworkResponse) -> (ILMessageFilterAction, ILMessageFilterSubAction) {
        // TODO: Replace with logic to parse the HTTP response and data payload of `networkResponse` to return an action.
        return (.none, .none)
    }

}
