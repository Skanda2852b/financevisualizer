import './globals.css';

export const metadata = {
  title: 'Personal Finance Tracker',
  description: 'Track your personal finances with ease',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}