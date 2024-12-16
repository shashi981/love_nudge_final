import Calendar from "./components/Calendar";
import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Relationship Journal</h1>
      <Navigation />
      <main className="mt-8">
        <Calendar />
      </main>
    </div>
  );
}
