import React from "react";

const Footer = () => {
  const footerLinks = [
    { title: "Company", links: ["About", "Jobs", "Press", "Partners"] },
    {
      title: "Solutions",
      links: ["Marketing", "Analytics", "Commerce", "insights"],
    },
    {
      title: "Documentation",
      links: ["Orders", "API Status"],
    },
    {
      title: "Legal",
      links: ["Claim", "Privacy", "Terms"],
    },
  ];
  return (
    <div className="w-full bg-black text-white px-2 py-6 mt-10">
      <div className="w-full flex flex-row flex-wrap justify-around">
        {footerLinks.map((item, i) => (
          <div className="text-center" key={i}>
            <h3 className="mb-4 font-semibold text-xl">{item.title}</h3>
            <div className="flex flex-col gap-1">
              {item.links &&
                item?.links.map((l, i) => (
                  <a href="" key={i}>
                    {l}
                  </a>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full text-center pt-10">
        <p>@ 2023 || All rights reserved</p>
        <p>Made by me.</p>
      </div>
    </div>
  );
};

export default Footer;
