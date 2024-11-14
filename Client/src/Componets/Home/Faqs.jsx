import React from 'react';

const Faqs = () => {
  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla condimentum tortor eu ipsum cursus, et dictum odio gravida.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Sed at bibendum leo. Ut tempor odio ac venenatis. In ultricies condimentum ornare. Sed vehicula quam eget malesuada fermentum.'
    },
    {
      question: 'Can I change or cancel my order?',
      answer: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce maximus quam sit amet vestibulum luctus.'
    },
    {
      question: 'Do you offer gift cards?',
      answer: 'Vivamus mollis, nulla nec rutrum scelerisque, lacus justo scelerisque arcu, sed laoreet metus justo ut enim.'
    },
    {
      question: 'How can I contact customer service?',
      answer: 'Integer a lectus ac tortor blandit molestie. Nunc efficitur velit sed massa auctor, eget molestie mauris luctus.'
    }
  ];

  return (<>
  
  <div data-aos="zoom-in" className="container mx-auto px-4 my-4">
    <h1 className="text-3xl font-bold text-green-800 my-8 text-center">Frequently Asked Questions</h1>
            <div data-aos="zoom-in" className="space-y-4 overflow-hidden ">
                {faqs.map((faq, index) => (
                    <details
                        key={index}
                        className="group border-s-4 shadow-md border-green-400  bg-green-50 bg-opacity-50 p-6 [&_summary::-webkit-details-marker]:hidden"
                    >
                        <summary className="flex cursor-pointer  items-center justify-between gap-1.5">
                            <h2 className="text-lg font-medium text-green-800">{faq.question}</h2>
                            <span className="shrink-0 rounded-full bg-white p-1.5 text-green-800 sm:p-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </summary>
                        <p className="mt-4 leading-relaxed  text-green-800">{faq.answer}</p>
                    </details>
                ))}
            </div></div></>
  );
};

export default Faqs;
