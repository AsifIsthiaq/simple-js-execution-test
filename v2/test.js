console.log(JSON.parse("{\"flow\":{\"entrypoint\":{\"function\":\"ENTRYPOINT\",\"config\":{\"accountIds\":[\"24a47ee0-b586-11ef-bf77-4574a2f5dc6b\"]},\"params\":{\"accountIds\":[\"24a47ee0-b586-11ef-bf77-4574a2f5dc6b\"],\"name\":\"srs_tele7_bot\"},\"events\":{\"OnSuccess\":\"1734106158528\"}},\"1734106158528\":{\"function\":\"SendMessage\",\"params\":{\"message\":\"Hello from rs-with-aibot\"},\"captures\":[],\"events\":{\"OnSuccess\":\"1734109979228\"}},\"1734106239168\":{\"function\":\"SendMessage\",\"params\":{\"message\":\"Next\\n\\nFullName: $fullName\\nDOB: $dob\"},\"captures\":[],\"events\":{\"OnSuccess\":null}},\"1734106265330\":{\"function\":\"SendMessage\",\"params\":{\"message\":\"Error\"},\"captures\":[],\"events\":{\"OnSuccess\":null}},\"1734106276738\":{\"function\":\"SendMessage\",\"params\":{\"message\":\"Timeout\"},\"captures\":[],\"events\":{\"OnSuccess\":null}},\"1734109979228\":{\"function\":\"AI\",\"ai\":{\"botId\":\"675c5b56cf34ead649d29099\",\"inputs\":[],\"outputs\":[{\"fieldName\":\"full_name\",\"fieldValue\":\"fullName\"},{\"fieldName\":\"dob\",\"fieldValue\":\"dob\"}]},\"params\":{\"maximumRetry\":1,\"timeOut\":60,\"timeUnit\":\"SECOND\"},\"messages\":{\"onTimeoutMessage\":{\"text\":\"OTM Hello\",\"captures\":[]},\"onLastTimeoutMessage\":{\"text\":\"OLTM hello\",\"captures\":[]}},\"events\":{\"OnTimeout\":\"1734106276738\",\"OnSuccess\":\"1734106239168\",\"OnError\":\"1734106265330\"}}},\"active\":true}"
));