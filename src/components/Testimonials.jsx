"use client";

export default function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      role: "Entrepreneur",
      image: "https://i.ibb.co.com/tpJqcGSB/antu.jpg",
      message: "This store has amazing products and excellent customer service!",
    },
    {
      name: "Jane Smith",
      role: "Designer",
      image: "https://i.ibb.co.com/7xjtSZxj/kabir.jpg",
      message: "I love the product variety and the website is super easy to navigate.",
    },
    {
      name: "Ali Khan",
      role: "Developer",
      image: "https://i.ibb.co.com/tMbhBq4Q/zabir.jpg",
      message: "High-quality products at reasonable prices. Highly recommended!",
    },
  ];

  return (
    <section className="px-6 py-12 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        What Our Customers Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((test, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <img
              src={test.image}
              alt={test.name}
              className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-indigo-500"
            />
            <p className="text-gray-700 dark:text-gray-200 italic mb-4">"{test.message}"</p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{test.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{test.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
