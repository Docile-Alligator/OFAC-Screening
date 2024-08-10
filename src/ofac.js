const ofacUrl = 'https://api.ofac-api.com/v4/screen';

function getBody(name, birthYear, country) {
    return {
        apiKey: process.env.REACT_APP_OFAC_API_KEY,
        minScore: 95,
        sources: [
            "SDN",
            "NONSDN",
            "DPL",
            "UN",
            "OFSI",
            "FSF",
            "DFAT",
            "FHFA",
            "SAM",
            "HUD",
            "DUAL-USE",
            "SEMA",
            "BFS",
            "SECO",
            "MXSAT",
            "LEIE",
            "LFIU",
            "LKTL",
            "US",
            "EU",
            "GB",
            "CA",
            "AU",
            "CH",
            "MX"
        ],
        types: [
            "person"
        ],
        cases: [
            {
                name: name,
                type: "person",
                dob: birthYear + "-01-01",
                citizenship: country,
                nationality: country,
                address: {
                    country: country
                },
                identification: [
                    {
                        type: "person",
                        country: country
                    }
                ]
            }
        ]
    };
}

async function screenCandidate(name, birthYear, country) {
    console.log(JSON.stringify(
        getBody(name, birthYear, country)
    ));
    /*const response = await fetch(ofacUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            getBody(name, birthYear, country)
        )
    });
    if (!response.ok) {
        throw new Error("Error contacting the server");
    }*/

    //const content = await response.json();
    const content = JSON.parse("{\n" +
        "  \"error\" : false,\n" +
        "  \"sources\" : [ {\n" +
        "    \"source\" : \"SEMA\",\n" +
        "    \"name\" : \"Canadian Special Economic Measures Act Sanctions\",\n" +
        "    \"publishDate\" : \"2024-08-08\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.780047\"\n" +
        "  }, {\n" +
        "    \"source\" : \"DPL\",\n" +
        "    \"name\" : \"US BIS Denied Persons List\",\n" +
        "    \"publishDate\" : \"2024-08-08\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.708422\"\n" +
        "  }, {\n" +
        "    \"source\" : \"LFIU\",\n" +
        "    \"name\" : \"Lithuanian FIU Sanctions\",\n" +
        "    \"publishDate\" : \"2024-08-08\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.805026\"\n" +
        "  }, {\n" +
        "    \"source\" : \"NONSDN\",\n" +
        "    \"name\" : \"OFAC Consolidated (non-SDN) List\",\n" +
        "    \"publishDate\" : \"2024-07-03\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.694842\"\n" +
        "  }, {\n" +
        "    \"source\" : \"DUAL-USE\",\n" +
        "    \"name\" : \"Dual Use Items\",\n" +
        "    \"publishDate\" : \"2024-08-08\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.775404\"\n" +
        "  }, {\n" +
        "    \"source\" : \"OFSI\",\n" +
        "    \"name\" : \"Office of Financial Sanctions Implementation\",\n" +
        "    \"publishDate\" : \"2024-08-08\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.728303\"\n" +
        "  }, {\n" +
        "    \"source\" : \"DFAT\",\n" +
        "    \"name\" : \"Australian Department of Foreign Affairs and Trade (DFAT)\",\n" +
        "    \"publishDate\" : \"2024-08-08\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.751825\"\n" +
        "  }, {\n" +
        "    \"source\" : \"BFS\",\n" +
        "    \"name\" : \"Belgian Financial Sanctions\",\n" +
        "    \"publishDate\" : \"2024-08-08\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.787472\"\n" +
        "  }, {\n" +
        "    \"source\" : \"LKTL\",\n" +
        "    \"publishDate\" : \"2024-08-08\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:20.607365\"\n" +
        "  }, {\n" +
        "    \"source\" : \"HUD\",\n" +
        "    \"name\" : \"HUD Excluded Parties Listing\",\n" +
        "    \"publishDate\" : \"2024-08-08\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.771566\"\n" +
        "  }, {\n" +
        "    \"source\" : \"LEIE\",\n" +
        "    \"name\" : \"OIG List of Excluded Individuals and Entities\",\n" +
        "    \"publishDate\" : \"2024-08-08\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.800836\"\n" +
        "  }, {\n" +
        "    \"source\" : \"FSF\",\n" +
        "    \"name\" : \"EU Financial Sanctions Files (FSF)\",\n" +
        "    \"publishDate\" : \"2024-08-07\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.733233\"\n" +
        "  }, {\n" +
        "    \"source\" : \"SECO\",\n" +
        "    \"name\" : \"Swiss SECO Sanctions and Embargoes\",\n" +
        "    \"publishDate\" : \"2024-08-08\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.791776\"\n" +
        "  }, {\n" +
        "    \"source\" : \"UN\",\n" +
        "    \"name\" : \"UN Security Council Consolidated Sanctions\",\n" +
        "    \"publishDate\" : \"2024-08-08\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.713067\"\n" +
        "  }, {\n" +
        "    \"source\" : \"SDN\",\n" +
        "    \"name\" : \"OFAC SDN\",\n" +
        "    \"publishDate\" : \"2024-08-06\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.69102\"\n" +
        "  }, {\n" +
        "    \"source\" : \"FHFA\",\n" +
        "    \"name\" : \"US FHFA Suspended Counterparty Program\",\n" +
        "    \"publishDate\" : \"2024-08-08\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.759046\"\n" +
        "  }, {\n" +
        "    \"source\" : \"MXSAT\",\n" +
        "    \"name\" : \"Mexican Tax Code Article 69.B\",\n" +
        "    \"publishDate\" : \"2024-08-08\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.79658\"\n" +
        "  }, {\n" +
        "    \"source\" : \"SAM\",\n" +
        "    \"name\" : \"US SAM Procurement Exclusions\",\n" +
        "    \"publishDate\" : \"2024-08-08\",\n" +
        "    \"downloadDate\" : \"2024-08-08T23:25:03.766467\"\n" +
        "  } ],\n" +
        "  \"results\" : [ {\n" +
        "    \"name\" : \"Alex\",\n" +
        "    \"matchCount\" : 1,\n" +
        "    \"matches\" : [ {\n" +
        "      \"score\" : 100,\n" +
        "      \"matchSummary\" : {\n" +
        "        \"matchFields\" : [ {\n" +
        "          \"similarity\" : \"STRONG\",\n" +
        "          \"fieldName\" : \"Name\",\n" +
        "          \"caseField\" : \"Alex\",\n" +
        "          \"sanctionField\" : \"Alex\",\n" +
        "          \"sanctionFieldNote\" : \"Alias\"\n" +
        "        } ]\n" +
        "      },\n" +
        "      \"sanction\" : {\n" +
        "        \"id\" : \"lktl-ramaiya-vivekandan\",\n" +
        "        \"type\" : \"Person\",\n" +
        "        \"categories\" : [ \"sanction\", \"debarment\" ],\n" +
        "        \"source\" : \"LKTL\",\n" +
        "        \"name\" : \"Ramaiya Vivekandan\",\n" +
        "        \"nameFormatted\" : \"ramaiya vivekandan\",\n" +
        "        \"description\" : \"NA\",\n" +
        "        \"entityLink\" : \"https://www.ofac-api.com/entities/lktl-ramaiya-vivekandan\",\n" +
        "        \"alias\" : [ {\n" +
        "          \"name\" : \"Periyavan\",\n" +
        "          \"firstName\" : \"Periyavan\"\n" +
        "        }, {\n" +
        "          \"name\" : \"Kandan\",\n" +
        "          \"firstName\" : \"Kandan\"\n" +
        "        }, {\n" +
        "          \"name\" : \"Alex\",\n" +
        "          \"firstName\" : \"Alex\"\n" +
        "        } ],\n" +
        "        \"remarks\" : \"Terrorism related activities.\",\n" +
        "        \"addresses\" : [ {\n" +
        "          \"address1\" : \"9th Road, Ambalnagar, Shanthapuram, Kilinochchi \",\n" +
        "          \"country\" : \"LK\",\n" +
        "          \"fullAddress\" : \"9th Road, Ambalnagar, Shanthapuram, Kilinochchi , LK\"\n" +
        "        } ],\n" +
        "        \"identifications\" : [ {\n" +
        "          \"type\" : \"NIC No.\",\n" +
        "          \"idNumber\" : \"932804840V\"\n" +
        "        }, {\n" +
        "          \"type\" : \"Passport\",\n" +
        "          \"idNumber\" : \"N 5080095 \"\n" +
        "        } ],\n" +
        "        \"additionalInformation\" : [ {\n" +
        "          \"label\" : \"action\",\n" +
        "          \"value\" : \"IN/CA/2024/67\"\n" +
        "        } ],\n" +
        "        \"personDetails\" : {\n" +
        "          \"title\" : \"NA\",\n" +
        "          \"birthDates\" : [ \"\" ],\n" +
        "          \"citizenships\" : [ \"Sri Lankan\" ],\n" +
        "          \"nationalities\" : [ ],\n" +
        "          \"positions\" : [ ]\n" +
        "        }\n" +
        "      }\n" +
        "    } ]\n" +
        "  } ]\n" +
        "}");

    /*const content = JSON.parse("{\n" +
        "    \"error\": false,\n" +
        "    \"sources\": [\n" +
        "        {\n" +
        "            \"source\": \"SDN\",\n" +
        "            \"name\": \"OFAC SDN\",\n" +
        "            \"publishDate\": \"2024-08-06\",\n" +
        "            \"downloadDate\": \"2024-08-08T23:25:07.729884\"\n" +
        "        }\n" +
        "    ],\n" +
        "    \"results\": [\n" +
        "        {\n" +
        "            \"name\": \"Jane Doe\",\n" +
        "            \"matchCount\": 0\n" +
        "        }\n" +
        "    ]\n" +
        "}");*/
    if (content.error) {
        throw new Error("Response error");
    }

    const matchJson = content.results[0];
    if (matchJson.matchCount === 0) {
        return "OK";
    }

    const allMatchesArray = matchJson.matches;
    const match = {};
    match.name = false;
    match.birthYear = false;
    match.country = false;

    for (const matchJson of allMatchesArray) {
        const matchFieldsArray = matchJson.matchSummary.matchFields;
        for (const matchField of matchFieldsArray) {
            const name = matchField.fieldName;
            if (name === "Name") {
                match.name = true;
            } else if (name === 'Dob') {
                match.birthYear = true;
            } else if (name === "Citizenship" || name === 'Nationality' || name === "Address" || name === "Country") {
                match.country = true;
            }
        }
    }

    return Promise.reject(match);
}

export { screenCandidate }