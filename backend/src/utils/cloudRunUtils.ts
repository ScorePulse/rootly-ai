import fetch, { RequestInit, Response } from "node-fetch";

export class TriggerCloudRun {
  private serviceUrl: string;

  constructor(serviceUrl: string) {
    if (!serviceUrl) {
      throw new Error("Cloud Run service URL is required.");
    }
    this.serviceUrl = serviceUrl;
  }

  public async triggerService(
    payload: any,
    method: string = "POST"
  ): Promise<any> {
    try {
      const response: Response = await fetch(this.serviceUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      } as RequestInit);

      if (response.ok) {
        const data: any = await response.json();
        console.log("Service triggered successfully:", data);
        return data;
      } else {
        const errorText = await response.text();
        console.error(
          "Failed to trigger service:",
          response.status,
          response.statusText,
          errorText
        );
        throw new Error(
          `Failed to trigger service: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error triggering service:", error);
      throw error;
    }
  }
}
