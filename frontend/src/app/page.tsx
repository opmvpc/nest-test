type GreetingResponse = {
  message: string;
};

async function fetchGreeting(): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not configured.');
  }

  let greetingUrl: string;

  try {
    greetingUrl = new URL('/greeting', baseUrl).toString();
  } catch {
    throw new Error('NEXT_PUBLIC_API_BASE_URL must be a valid URL.');
  }

  const response = await fetch(greetingUrl, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Failed to load greeting: ${response.status} ${response.statusText}`);
  }

  const data: GreetingResponse = await response.json();
  return data.message;
}

export default async function Home() {
  let message: string;

  try {
    message = await fetchGreeting();
  } catch (error) {
    message =
      error instanceof Error
        ? error.message
        : 'Unknown error while loading the greeting message.';
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 p-8">
      <h1 className="text-3xl font-bold">Frontend & Backend handshake</h1>
      <p className="text-lg text-center text-gray-700">{message}</p>
    </main>
  );
}
