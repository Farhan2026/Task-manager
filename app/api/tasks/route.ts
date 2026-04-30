import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, description, assignedTo } = await req.json();
  const task = await prisma.task.create({
    data: { title, description, assignedTo }
  });
  return NextResponse.json(task);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const tasks = await prisma.task.findMany({
      where: { assignedTo: email },
      orderBy: { createdAt: 'desc' } 
    });

    return NextResponse.json(tasks); 
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    const updatedTask = await prisma.task.update({
      where: { id: id },
      data: { status: status },
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}