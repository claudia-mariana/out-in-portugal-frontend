import about from "../images/about.jpg"

function AboutPage() {
    return (
      <div className="max-w-5xl mx-auto mt-10 mb-6 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-5xl font-bold text-center text-blue mb-8">
          Welcome to OutInPortugal
          </h1>

          

          <h2 className="text-3xl font-bold text-center text-blue-medium mb-8">
            Your go-to platform for discovering and sharing outdoor activities across Portugal!
            </h2>
        
            <img src={about} className='w-full h-80 object-fill object-top' alt="about page image" />
  
        <h3 className="text-xl font-semibold text-center text-blue-medium mb-8 mt-5">
          Whether you're seeking an adventure in the mountains, a relaxing day at the beach, or a cultural walking tour, OutInPortugal connects you with an active community of outdoor enthusiasts.
        </h3>
  
        <p className="text-gray mb-10">
          Our mission is to inspire exploration, foster connections, and celebrate the beauty of Portugal's incredible landscapes – one activity at a time.
          Whether you're a local or just visiting, OutInPortugal helps you make the most of your time outdoors. Together, let's build a vibrant, active community that thrives in the fresh air and breathtaking scenery of Portugal.
          Join us today and start your next adventure!
        </p>
  
        <h3 className="text-xl font-semibold text-blue-medium mb-2">About the Team</h3>
  
        <p className="text-gray">
          We are two Portuguese bootcampers, Claudia & Mariana, currently building this platform from the ground up, putting into practice the skills we are acquiring throughout our bootcamp journey.
        </p>
      </div>
    );
  }
  
  export default AboutPage;