// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
secure: true
});

// Log the configuration
console.log(cloudinary.config());


/////////////////////////
// Uploads a video file
/////////////////////////
const uploadVideo = async (videoPath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      resource_type: "video",
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the video
      const result = await cloudinary.uploader.upload(videoPath, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};
    

  

//////////////////////////////////////////////////////////////
// Creates an embeddable iFrame video player
// setting the uploaded video as the source and
// uses automatic streaming profile selection to deliver
// the video using adaptive bitrate streaming
//////////////////////////////////////////////////////////////
const createVideoPlayer = (publicId) => {

  const cloudName = cloudinary.config().cloud_name;
  const sourceConfig = "source[sourceTypes][0]=hls&source[transformation][streaming_profile]=auto"
  const videoPlayer = 
  `
  <iframe
    src="https://player.cloudinary.com/embed/?public_id=${publicId}&cloud_name=${cloudName}&${sourceConfig}"
    width="640"
    height="360" 
    style="height: auto; width: 100%; aspect-ratio: 640 / 360;"
    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
    allowfullscreen
    frameborder="0">
  </iframe>
  `

  return videoPlayer;
};
   

//////////////////
//
// Main function
//
//////////////////
(async () => {

    // Set the image to upload
    const videoPath = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/videos/skate.mp4';

    // Upload the image
    const publicId = await uploadVideo(videoPath);

    // Create a video player iFrame with adaptive bitrate streaming
    const videoPlayer = createVideoPlayer(publicId);

    // Log the video player iFrame code to the console
    console.log(videoPlayer);

})();
