import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Category from '@/app/models/Category';

export async function GET() {
  try {
    await dbConnect();

    const defaultCategories = [
      { name: 'Food', color: '#FF6384', type: 'expense' },
      { name: 'Transport', color: '#36A2EB', type: 'expense' },
      { name: 'Entertainment', color: '#FFCE56', type: 'expense' },
      { name: 'Utilities', color: '#4BC0C0', type: 'expense' },
      { name: 'Rent', color: '#9966FF', type: 'expense' },
      { name: 'Salary', color: '#FF9F40', type: 'income' },
      { name: 'Freelance', color: '#C9CBCF', type: 'income' },
    ];

    for (const category of defaultCategories) {
      await Category.findOneAndUpdate(
        { name: category.name },
        category,
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ message: 'Default categories initialized' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}