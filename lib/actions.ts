"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function createCraft(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const difficulty = formData.get("difficulty") as string;
  const estimatedTime = Number(formData.get("estimatedTime"));

  await prisma.craft.create({
    data: {
      title,
      description,
      difficulty,
      estimatedTime,
      userId: user.id,
    },
  });

  redirect("/explore");
}

export async function signUp(
  prevState: { error: string } | undefined,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  await signIn("credentials", { email, password, redirectTo: "/explore" });
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/explore",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Invalid email or password.";
    }
    throw error;
  }
}

export async function createPost(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/login");
  }

  const craftId = formData.get("craftId") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const caption = formData.get("caption") as string;

  await prisma.post.create({
    data: {
      craftId,
      imageUrl,
      caption: caption || null,
      userId: user.id,
    },
  });

  redirect("/community");
}