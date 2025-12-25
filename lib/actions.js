"use server";

import prisma from "./prisma.js";
import { revalidatePath } from "next/cache";

// 1. Fetch all teams sorted by score for the leaderboard
export async function getTeams() {
  return await prisma.team.findMany({
    orderBy: { totalScore: 'desc' },
  });
}

// 2. Add a new team to the competition
export async function createTeam(formData) {
  const name = formData.get("name");
  await prisma.team.create({
    data: { name },
  });
  revalidatePath("/judges");
}

// 3. Update scores based on the 6 criteria in the PDF [cite: 38-43]
export async function updateScore(teamId, category, amount) {
  const team = await prisma.team.findUnique({ where: { id: teamId } });

  // Update the specific category value
  const newValue = Math.max(0, team[category] + amount);
  const dataUpdate = { [category]: newValue };

  // Calculate the new total based on PDF weights:
  // Sustainability (20%), Prototype (30%), Originality (15%), 
  // Real App (15%), Finance (10%), Presentation (10%)
  const total = 
    (category === 'sustainability' ? newValue : team.sustainability) +
    (category === 'prototype' ? newValue : team.prototype) +
    (category === 'originality' ? newValue : team.originality) +
    (category === 'application' ? newValue : team.application) +
    (category === 'finance' ? newValue : team.finance) +
    (category === 'presentation' ? newValue : team.presentation);

  await prisma.team.update({
    where: { id: teamId },
    data: { ...dataUpdate, totalScore: total },
  });

  revalidatePath("/judges");
}