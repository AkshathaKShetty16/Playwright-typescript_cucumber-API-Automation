export class AllureHelper {

    static attachRequest(
        world: any,
        method: string,
        url: string,
        requestBody?: any,
        requestHeaders?: Record<string, string>
    ) {

        const request = {
            method,
            url,
            headers: requestHeaders ?? {},
            body: requestBody ?? null
        };

        world.attach(
            JSON.stringify(request, null, 2),
            "application/json"
        );
    }

    static attachResponse(
        world: any,
        status: number,
        responseBody: any
    ) {

        world.attach(
            `Status Code : ${status}`,
            "text/plain"
        );

        world.attach(
            JSON.stringify(responseBody, null, 2),
            "application/json"
        );
    }

}