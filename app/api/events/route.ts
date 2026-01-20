import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to the data file in the main app
const dataFilePath = path.join(process.cwd(), '../src/data/events.json');

export async function GET() {
    try {
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        const data = JSON.parse(fileContents);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading events:', error);
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        fs.writeFileSync(dataFilePath, JSON.stringify(body, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error writing events:', error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
