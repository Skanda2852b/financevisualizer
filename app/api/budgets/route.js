import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Budget from '@/app/models/Budget';

export async function GET() {
  try {
    await dbConnect();
    const budgets = await Budget.find().populate('category').sort({ month: -1 });
    return NextResponse.json(budgets);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    if (!body.category || !body.amount || !body.month) {
      return NextResponse.json(
        { error: 'Category, amount, and month are required' },
        { status: 400 }
      );
    }
    
    const budget = await Budget.create(body);
    await budget.populate('category');
    
    return NextResponse.json(budget, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}