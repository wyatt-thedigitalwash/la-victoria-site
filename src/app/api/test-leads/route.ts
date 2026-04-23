import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const TEST_LEADS = [
  { first_name: "John", last_name: "Smith", email: "john@test.com", phone: "(813) 555-0001" },
  { first_name: "Jane", last_name: "Doe", email: "jane@test.com", phone: "(813) 555-0002" },
  { first_name: "Mike", last_name: "Johnson", email: "mike@test.com", phone: null },
  { first_name: "Sarah", last_name: "Williams", email: "sarah@test.com", phone: "(813) 555-0004" },
  { first_name: "Alex", last_name: "Brown", email: "alex@test.com", phone: null },
];

export async function GET() {
  const results = [];

  for (const lead of TEST_LEADS) {
    const { error } = await supabaseAdmin.from("leads").insert(lead);
    results.push({
      ...lead,
      status: error ? "failed" : "success",
      error: error?.message ?? null,
    });
  }

  return NextResponse.json({ results });
}
