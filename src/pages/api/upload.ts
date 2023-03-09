import multer from 'multer';
import nc from 'next-connect';
import { v2 as cloudinary } from 'cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';

cloudinary.config(process.env.CLOUDINARY_URL!);

// Multer middleware
const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname)
  }),
});

// Catch error and not found api
const apiRoute = nc({
  onError: (err, req, res: NextApiResponse) => {
    res.status(500).json({ msg: 'Something broke!' });
  },
  onNoMatch: (req, res: NextApiResponse) => {
    res.status(404).json({ msg: 'Page is not found!' });
  }
});

// Using middlewares
apiRoute.use(upload.single('image'));

// Api response
apiRoute.post(async (
  req: NextApiRequest & { file: any },
  res: NextApiResponse
) => {
  try {
    const image = await cloudinary.uploader.upload(req.file.path, {
      folder: 'image-uploader'
    });
    res.status(200).json({ url: image.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something broke!' });
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};
export default apiRoute;
