import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Invalid email' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'data', 'subscribers.json');
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let subscribers = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      subscribers = JSON.parse(fileData);
    }

    subscribers.push({ email, timestamp: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));

    return Response.json({ success: true, message: 'Subscriber saved' });
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json({ error: 'Failed to save subscriber' }, { status: 500 });
  }
}
