import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Transaction from '@/app/models/Transaction';

export async function GET() {
  try {
    await dbConnect();
    const transactions = await Transaction.find()
      .populate('category')
      .sort({ date: -1, createdAt: -1 });
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Basic validation
    if (!body.amount || !body.description) {
      return NextResponse.json(
        { error: 'Amount and description are required' },
        { status: 400 }
      );
    }
    
    const transaction = await Transaction.create(body);
    await transaction.populate('category');
    
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}