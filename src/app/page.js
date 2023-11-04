import MainWindow from "@/components/MainWindow";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="h-screen">
      <NavBar />
      <section className="flex w-screen h-5/6 justify-between">
        <MainWindow />
      </section>
    </main>
  );
}
