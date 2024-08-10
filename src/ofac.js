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
    const response = await fetch(ofacUrl, {
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
    }

    const content = await response.json();
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