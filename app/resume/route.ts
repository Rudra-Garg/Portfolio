import { NextResponse } from "next/server";

const DRIVE_FILE_ID = "1a8PQvmwxrUp54Vz3GdB9GLsgGGD9jB1B";
const DRIVE_URL = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;

export const revalidate = 3600; // revalidate cache every hour

export async function GET() {
    try {
        const res = await fetch(DRIVE_URL, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: "Failed to fetch resume" },
                { status: 502 }
            );
        }

        const pdf = await res.arrayBuffer();

        return new NextResponse(pdf, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'inline; filename="Rudra-Garg-Resume.pdf"',
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch resume" },
            { status: 500 }
        );
    }
}
