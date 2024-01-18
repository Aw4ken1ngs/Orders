import { NextResponse } from 'next/server';

export async function GET() {
  const product = {
    id: 1,
    name: "Кирпич Микс",
    price: 89.25,
    unit: "шт"
  }
  return NextResponse.json({ data: [product, product, product] })
}