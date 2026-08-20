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

  await prisma.user.update({
    where: { id: user.id },
    data: { ecoPoints: { increment: 10 } },
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

  await signIn("credentials", { email, password, redirectTo: "/onboarding" });
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

  await prisma.user.update({
    where: { id: user.id },
    data: { ecoPoints: { increment: 5 } },
  });

  redirect("/community");
}
export async function createListing(formData: FormData) {
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
  const quantity = Number(formData.get("quantity"));

  await prisma.marketplaceListing.create({
    data: {
      title,
      description: description || null,
      quantity,
      userId: user.id,
    },
  });

  redirect("/marketplace");
}

export async function claimListing(listingId: string) {
  "use server";
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  await prisma.marketplaceListing.update({
    where: { id: listingId },
    data: { status: "claimed" },
  });

  redirect("/marketplace");
}
const ADMIN_EMAIL = "malakfaour000@gmail.com";

export async function createChallenge(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const isOfficial = session.user.email === ADMIN_EMAIL;

  await prisma.challenge.create({
    data: {
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      isOfficial,
    },
  });

  redirect("/challenges");
}
export async function submitToChallenge(formData: FormData) {
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

  const challengeId = formData.get("challengeId") as string;
  const craftId = formData.get("craftId") as string;

  await prisma.challengeSubmission.create({
    data: {
      challengeId,
      craftId,
      userId: user.id,
    },
  });

  redirect(`/challenges/${challengeId}`);
}
export async function createRecyclingCenter(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const materialsRaw = formData.get("acceptedMaterials") as string;
  const acceptedMaterials = materialsRaw
    .split(",")
    .map((m) => m.trim())
    .filter((m) => m.length > 0);

  await prisma.recyclingCenter.create({
    data: {
      name,
      address,
      acceptedMaterials,
    },
  });

  redirect("/recycling");
}

export async function createCollection(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const craftIds = formData.getAll("craftIds") as string[];

  const collection = await prisma.collection.create({
    data: {
      title,
      description: description || null,
    },
  });

  for (const craftId of craftIds) {
    await prisma.collectionCraft.create({
      data: {
        collectionId: collection.id,
        craftId,
      },
    });
  }

  redirect(`/collections/${collection.id}`);
}
export async function completeOnboarding(formData: FormData) {
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

  const interests = formData.getAll("interests") as string[];

  await prisma.user.update({
    where: { id: user.id },
    data: {
      interests,
      onboarded: true,
    },
  });

  redirect("/explore");
}