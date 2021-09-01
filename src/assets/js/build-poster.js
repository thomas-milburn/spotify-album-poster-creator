import {PDFDocument, StandardFonts, rgb} from 'pdf-lib'
import download from 'downloadjs'

export async function buildPoster(albumData) {
   console.log(albumData)
   // Fetching album info
   const albumName = albumData.name;
   const albumCoverBytes = await fetch(albumData.images[0].url).then((res) => res.arrayBuffer())

   // Setting up pdf
   const pdfDoc = await PDFDocument.create()
   const page = pdfDoc.addPage()
   const {width, height} = page.getSize()

   // Embedding everything we need into the pdf
   const albumCoverImage = await pdfDoc.embedJpg(albumCoverBytes)
   const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
   const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)

   // Constants
   const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
   ];

   const pagePadding = 50;
   const albumNameFontSize = 30;
   const artistNameFontSize = 20;
   const releaseDateFontSize = 12;
   // Space between album cover and album name, album name and artist name etc
   const topSectionSpacing = 12;
   const separationLineHeight = 3;

   // Drawing poster

   // Drawing cover image
   const coverImageSize = width - pagePadding * 2;
   const coverImageY = height - pagePadding - coverImageSize;

   page.drawImage(albumCoverImage, {
      x: width / 2 - coverImageSize / 2,
      y: coverImageY,
      width: coverImageSize,
      height: coverImageSize,
   })

   // Drawing album name
   const albumNameHeight = helveticaBold.heightAtSize(albumNameFontSize);
   const albumNameY = coverImageY - albumNameHeight - topSectionSpacing

   page.drawText(albumData.name, {
      x: pagePadding,
      y: albumNameY,
      size: albumNameFontSize,
      font: helveticaBold,
      color: rgb(0, 0, 0),
      maxWidth: width - pagePadding * 2
   })

   // Drawing artist name
   const artistNameHeight = helvetica.heightAtSize(artistNameFontSize);
   const artistNameY = albumNameY - artistNameHeight - topSectionSpacing;
   const artists = [];

   for (const artist of albumData.artists) {
      artists.push(artist.name)
   }

   page.drawText(artists.join(", "), {
      x: pagePadding,
      y: artistNameY,
      size: artistNameFontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
      maxWidth: width - pagePadding * 2
   })

   // Drawing release date
   const releaseDateSplit = albumData.release_date.split("-");
   const releaseYear = releaseDateSplit[0];
   const releaseMonth = releaseDateSplit[1];
   const releaseDay = releaseDateSplit[2];

   const releaseMonthName = monthNames[releaseMonth - 1];
   const releaseDateText = `${releaseMonthName} ${releaseDay}, ${releaseYear}`
   const releaseDateWidth = helvetica.widthOfTextAtSize(releaseDateText, releaseDateFontSize)

   page.drawText(releaseDateText, {
         x: width - pagePadding - releaseDateWidth,
         y: artistNameY,
         size: releaseDateFontSize,
         font: helvetica,
         color: rgb(0, 0, 0),
         maxWidth: width - pagePadding * 2
      })

   // Drawing separation line
   const separationLineY = artistNameY - topSectionSpacing - separationLineHeight;
   page.drawLine({
      start: { x: pagePadding, y: separationLineY },
      end: { x: width - pagePadding, y: separationLineY },
      thickness: separationLineHeight,
      color: rgb(0, 0, 0),
   })

   const pdfBytes = await pdfDoc.save()
   download(pdfBytes, `${albumName} poster.pdf`, "application/pdf")
}
