import React from "react";

const Abhishek = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="mockup-code w-full max-w-xs sm:max-w-6xl mx-auto p-5 bg-gray-900 text-white rounded-lg shadow-lg">
          <pre data-prefix="1" className="text-purple-400">
            <code>class</code>
            <code className="text-yellow-400"> Abhishek</code>
            <code className="text-purple-400">{" {"}</code>
          </pre>

          {/* Introduction */}
          <pre data-prefix="2" className="text-gray-500">
            <code className="ms-8">// I can, because I did.</code>
          </pre>
          <pre data-prefix="3" className="text-gray-500">
            <code className="ms-8">
              // My vast variety of skills is continuously expanding.
            </code>
          </pre>
          <br />

          {/* Constructor */}
          <pre data-prefix="4" className="text-yellow-400">
            <code> constructor()</code>
            <code>{" {"}</code>
          </pre>
          <pre data-prefix="5" className="text-green-400">
            <code>{"    this.name = 'Abhishek Shaw'"}</code>
          </pre>

          <pre data-prefix="6" className="text-red-400">
            <code>{"    this.email = 'abhisheklshaw2@gmail.com'"}</code>
          </pre>
          <pre data-prefix="7" className="text-yellow-400">
            <code>{" }"}</code>
          </pre>
          <br />
          {/* Work Experience */}
          <pre data-prefix="8" className="text-yellow-400">
            <code>{"  workExperience() {"}</code>
          </pre>

          <pre data-prefix="9" className="text-green-400">
            <code>
              {
                "    { '2024-now': 'Full-stack Developer Intern at CodeClouds' }"
              }
            </code>
          </pre>
          <pre data-prefix="10" className="text-yellow-400">
            <code>{" }"}</code>
          </pre>
          <br />

          {/* Skills */}
          <pre data-prefix="11" className="text-yellow-400">
            <code>{" Skills() {"}</code>
          </pre>
          <pre data-prefix="12" className="text-teal-400">
            <code>
              {`   ['HTML/CSS/JS', 'Node.js', 'Bootstrap/Tailwind', 'React/Vite', 'npm/yarn',`}
            </code>
            <br />
          </pre>
          <pre data-prefix="13" className="text-teal-400">
            <code>
              {`   'Web Sockets', 'PHP', 'MySQL/MongoDB/ORM', 'WordPress', 'Shopify', 'TypeScript']`}
            </code>
          </pre>
          <pre data-prefix="14" className="text-yellow-400">
            <code>{"  }"}</code>
          </pre>

          <pre data-prefix="15" className="text-purple-400">
            <code>{"}"}</code>
          </pre>
        </div>
      </div>
    </>
  );
};

export default Abhishek;
