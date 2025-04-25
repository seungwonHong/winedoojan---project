export async function POST(req: Request) {
    try {
      const body = await req.json();
      const authHeader = req.headers.get('authorization'); // 클라이언트에서 받은 토큰
  
      console.log("Received body:", body);
      console.log("Received Authorization:", authHeader);
  
      const res = await fetch('https://winereview-api.vercel.app/14-2/wines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authHeader && { 'Authorization': authHeader }), // 있으면 전달
        },
        body: JSON.stringify(body),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error("External API Error:", errorText);
        throw new Error(`External API Error: ${errorText}`);
      }
  
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
        status: res.status,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error in POST handler:", error.message);
        return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), { 
          status: 500 
        });
      } else {
        console.error("Unknown error:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error", error: "Unknown error occurred" }), { 
          status: 500 
        });
      }
    }
  }  