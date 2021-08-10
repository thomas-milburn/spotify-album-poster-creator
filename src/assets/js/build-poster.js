import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import download from 'downloadjs'

export async function buildPoster(albumData) {
   // Fetching album info
   const albumName = albumData.name;
   const albumCoverBytes = await fetch(albumData.images[0].url).then((res) => res.arrayBuffer())

   // Setting up pdf
   const pdfDoc = await PDFDocument.create()
   const page = pdfDoc.addPage()
   const { width, height } = page.getSize()

   // Embedding everything we need into the pdf
   const albumCoverImage = await pdfDoc.embedJpg(albumCoverBytes)

   const coverSize = 200;

   // Drawing poster
   page.drawImage(albumCoverImage, {
      x: width / 2 - coverSize / 2,
      y: height - coverSize,
      width: coverSize,
      height: coverSize,
   })

   const pdfBytes = await pdfDoc.save()
   console.log(pdfBytes)

   download(pdfBytes, `${albumName} poster.pdf`, "application/pdf")
}