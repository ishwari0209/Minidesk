export default function Footer() {
  const year = new Date().getFullYear();

 

  return (
    <footer className="bg-white rounded-2xl mt-10 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
         
        {/* Bottom bar */}
        <div className="border-t border-slate-100 pt-6 flex flex-col items-center gap-2 text-sm text-slate-400 text-center">
          <p>© {year} LeadDesk. All rights reserved.</p>
          <p>
            Built for Digital Heroes Training Task,{" "}
            
              <a href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-indigo-600 underline"
            >
              digitalheroesco.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}