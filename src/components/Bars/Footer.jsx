function Footer() {
  return (
    <footer className="bg-blue-light text-blue-medium p-3 max-h-12">
      <div className="flex flex-row  md:flex-row justify-center items-center space-y-0 space-x-6">
        <a
          href="https://github.com/claudia-mariana/out-in-portugal-frontend"
          className="text-blue hover:underline font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repository
        </a>
        <a
          href="https://github.com/claudiapando17"
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cláudia
        </a>
        <a
          href="https://github.com/marianafrazao"
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mariana
        </a>
      </div>
    </footer>
  );
}

export default Footer;