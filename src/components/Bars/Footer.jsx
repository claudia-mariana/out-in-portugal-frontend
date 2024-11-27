function Footer() {
  return (
    <footer className="bg-gray text-white p-3 mt-0 max-h-12">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6">
        <a
          href="https://github.com/claudia-mariana/out-in-portugal-frontend"
          className="hover:underline"
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