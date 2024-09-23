import React, { useState, useEffect } from 'react';

const Stories = () => {
  const storiesData = [
    {
      userId: 1,
      username: 'John Doe',
      stories: [
        { id: 1, imageUrl: 'https://via.placeholder.com/400x600', storyUrl: 'https://yourblog.com/story/1' },
        { id: 2, imageUrl: 'https://via.placeholder.com/500x500', storyUrl: 'https://yourblog.com/story/2' },
      ],
    },
    {
      userId: 2,
      username: 'Jane Smith',
      stories: [
        { id: 3, imageUrl: 'https://via.placeholder.com/600x400', storyUrl: 'https://yourblog.com/story/3' },
      ],
    },
  ];

  const [currentUserIndex, setCurrentUserIndex] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [viewedStories, setViewedStories] = useState(new Set());

  useEffect(() => {
    if (currentUserIndex !== null) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + (100 / 150); // Increment to complete in 15 seconds
          } else {
            markStoryAsViewed(currentUserIndex, currentStoryIndex); // Mark as viewed if completed
            goToNextStory();
            return 100; // Ensure progress is capped at 100
          }
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [progress, currentUserIndex, currentStoryIndex]);

  const markStoryAsViewed = (userIndex, storyIndex) => {
    setViewedStories((prevViewed) => new Set([...prevViewed, `${userIndex}-${storyIndex}`]));
  };

  const goToNextStory = () => {
    if (currentStoryIndex < storiesData[currentUserIndex].stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      closeStory();
    }
  };

  const goToPrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    }
  };

  const closeStory = () => {
    setCurrentUserIndex(null);
    setCurrentStoryIndex(0);
    setProgress(0);
  };

  const handleUserClick = (userIndex) => {
    setCurrentUserIndex(userIndex);
    setCurrentStoryIndex(0);
    setProgress(0); // Reset progress when a new user’s stories are opened
  };

  const handleStoryClick = (e) => {
    markStoryAsViewed(currentUserIndex, currentStoryIndex); // Mark current story as viewed
    if (e.clientX < window.innerWidth / 2) {
      goToPrevStory();
    } else {
      goToNextStory();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* User Story Circles */}
      <div className="flex space-x-4 p-4">
        {storiesData.map((user, userIndex) => (
          <div key={user.userId} onClick={() => handleUserClick(userIndex)} className="cursor-pointer">
            <div
              className={`relative border-2 p-1 rounded-full transition-opacity ${
                [...viewedStories].some(story => story.startsWith(`${userIndex}-`))
                  ? 'border-gray-300 opacity-60'
                  : 'border-pink-500'
              }`}
            >
              <img
                src={user.stories[0].imageUrl} // Display the first story as the user’s avatar
                alt={user.username}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <p className="text-center mt-2 text-sm">{user.username}</p>
          </div>
        ))}
      </div>

      {/* Story Modal */}
      {currentUserIndex !== null && storiesData[currentUserIndex].stories.length > 0 && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeStory} // Close story when clicked anywhere outside
        >
          <div
            className="relative w-full max-w-md h-3/4 bg-white rounded-lg shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent close on content click
          >
            {/* Close Button */}
            <button
              onClick={closeStory}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full z-50"
            >
              ✕
            </button>

            {/* Story Content */}
            <div className="relative w-full h-full" onClick={handleStoryClick}>
              <img
                src={storiesData[currentUserIndex].stories[currentStoryIndex].imageUrl}
                alt={storiesData[currentUserIndex].username}
                className={`w-full h-full object-cover ${viewedStories.has(`${currentUserIndex}-${currentStoryIndex}`) ? 'opacity-60' : 'opacity-100'}`}
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
              />

              {/* Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-300 flex">
                <div
                  className="h-full bg-pink-500 transition-all"
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Story Info */}
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">{storiesData[currentUserIndex].username}</h2>
              <a
                href={storiesData[currentUserIndex].stories[currentStoryIndex].storyUrl}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Full Blog
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
