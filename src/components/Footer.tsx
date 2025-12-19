const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-black py-8 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="container px-4 mx-auto text-center">
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Made by <span className="text-blue-600 dark:text-blue-400 font-bold">Raunak Agarwal</span>
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-600 mt-2">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
