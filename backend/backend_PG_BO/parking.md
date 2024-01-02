most popular US tech stocks in 2023:


Apple Inc. (AAPL)
Microsoft Corp. (MSFT)
Nvidia Corp. (NVDA)
Broadcom Inc. (AVGO)
Adobe Inc. (ADBE)
Cisco Systems Inc. (CSCO)
Accenture PLC (ACN)
Salesforce Inc. (CRM)
Amazon (AMZN)
Alphabet (GOOGL)
Meta Platforms (META)


return treasuryYields != null ? treasuryYields : Collections.emptyList();

List<String> treasuryYields = new ArrayList<>();

    if (dayYields != null && dayYields.size() >= 11) {
        for (int i = 0; i < 11; i++) {
            if (dayYields.get(i).containsKey("value")) {
                treasuryYields.add(dayYields.get(i).get("value"));
            }
        }
    } else {
        
        System.out.println("Insufficient data from API");
    }

    return treasuryYields;