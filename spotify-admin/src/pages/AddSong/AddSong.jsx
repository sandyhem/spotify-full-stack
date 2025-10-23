import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { url } from '../../App'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddSong = () => {

  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]); // ✅ safe initial state

  // ===============================
  // 📦 Submit Handler
  // ===============================
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("audio", song);
      formData.append("album", album);

      const response = await axios.post(`${url}/api/song/add`, formData);

      if (response.data.success) {
        toast.success("✅ Song Added Successfully");
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(false);
        setSong(false);
      } else {
        toast.error("❌ Something went wrong while adding the song");
      }

    } catch (error) {
      toast.error("❌ Error occurred while adding the song");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // 🎵 Load Album Data
  // ===============================
  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      // ✅ Ensure always array
      setAlbumData(response.data.albums || []);
    } catch (error) {
      console.error("Error fetching albums:", error);
      setAlbumData([]); // fallback
    }
  };

  useEffect(() => {
    loadAlbumData();
  }, []);

  // ===============================
  // ⏳ Loader
  // ===============================
  if (loading) {
    return (
      <div className='grid place-items-center min-h-[80vh]'>
        <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // ===============================
  // 🎶 Form UI
  // ===============================
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>

      <div className='flex gap-8'>
        {/* Upload Song */}
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input
            onChange={(e) => setSong(e.target.files[0])}
            type="file"
            id='song'
            accept='audio/*'
            hidden
          />
          <label htmlFor="song">
            <img
              className='w-24 cursor-pointer'
              src={song ? assets.upload_added : assets.upload_song}
              alt="upload song"
            />
          </label>
        </div>

        {/* Upload Image */}
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id='image'
            accept='image/*'
            hidden
          />
          <label htmlFor="image">
            <img
              className='w-24 cursor-pointer'
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload"
            />
          </label>
        </div>
      </div>

      {/* Song Name */}
      <div className="flex flex-col gap-2.5">
        <p>Song Name</p>
        <input
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder='Type here'
          required
        />
      </div>

      {/* Song Description */}
      <div className="flex flex-col gap-2.5">
        <p>Song Description</p>
        <input
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          type="text"
          placeholder='Type here'
          required
        />
      </div>

      {/* Album Selection */}
      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]'
          onChange={(e) => setAlbum(e.target.value)}
          value={album}
        >
          <option value="none">None</option>

          {/* ✅ Safe map with fallback */}
          {albumData?.length > 0 ? (
            albumData.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))
          ) : (
            <option disabled>No albums found</option>
          )}
        </select>
      </div>

      <button
        className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'
        type='submit'
      >
        ADD
      </button>
    </form>
  );
};

export default AddSong;
