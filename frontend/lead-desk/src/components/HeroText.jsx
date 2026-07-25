import {
  Rocket,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function HeroText() {
  return (
    <div>

      <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-600 px-5 py-2 rounded-full font-medium mb-8">
        ✨ Smart Solution For Your Business
      </div>

      <h1 className="text-6xl font-extrabold leading-tight text-slate-900">
        Get More Leads.
        <br />
        <span className="text-indigo-600">
          Grow Your Business.
        </span>
      </h1>

      <p className="text-gray-500 mt-6 text-lg max-w-lg leading-8">
        We help businesses generate quality leads through a
        modern lead management platform.
      </p>

      <div className="mt-14 space-y-8">

        <div className="flex gap-5">

          <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
            <Rocket className="text-indigo-600"/>
          </div>

          <div>
            <h3 className="font-bold text-xl">
              Fast & Easy
            </h3>

            <p className="text-gray-500">
              Submit enquiries within seconds.
            </p>
          </div>

        </div>

        <div className="flex gap-5">

          <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
            <ShieldCheck className="text-indigo-600"/>
          </div>

          <div>
            <h3 className="font-bold text-xl">
              Secure & Reliable
            </h3>

            <p className="text-gray-500">
              Your information stays protected.
            </p>
          </div>

        </div>

        <div className="flex gap-5">

          <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
            <TrendingUp className="text-indigo-600"/>
          </div>

          <div>
            <h3 className="font-bold text-xl">
              Boost Growth
            </h3>

            <p className="text-gray-500">
              Convert visitors into valuable customers.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}