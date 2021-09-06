import {PDFDocument, StandardFonts, rgb} from 'pdf-lib';
import download from 'downloadjs';

export async function buildPoster(albumData) {
   console.log(albumData);
   // Fetching album info
   const albumName = albumData.name;
   const albumCoverBytes = await fetch(albumData.images[0].url).then((res) => res.arrayBuffer());

   // Setting up pdf
   const pdfDoc = await PDFDocument.create();
   const page = pdfDoc.addPage();
   const {width, height} = page.getSize();

   // Embedding everything we need into the pdf
   const albumCoverImage = await pdfDoc.embedJpg(albumCoverBytes);
   const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
   const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

   // Constants
   const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
   ];

   const pagePadding = 30;
   const albumNameFontSize = 30;
   const artistNameFontSize = 20;
   const releaseDateFontSize = 12;
   const trackNameFontSize = 12;
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
   });

   // Drawing album name
   const albumNameHeight = helveticaBold.heightAtSize(albumNameFontSize);
   const albumNameY = coverImageY - albumNameHeight - topSectionSpacing;

   page.drawText(albumData.name, {
      x: pagePadding,
      y: albumNameY,
      size: albumNameFontSize,
      font: helveticaBold,
      color: rgb(0, 0, 0),
      maxWidth: width - pagePadding * 2
   });

   // Drawing artist name
   const artistNameHeight = helvetica.heightAtSize(artistNameFontSize);
   const artistNameY = albumNameY - artistNameHeight - topSectionSpacing;
   const artists = [];

   for (const artist of albumData.artists) {
      artists.push(artist.name);
   }

   page.drawText(artists.join(", "), {
      x: pagePadding,
      y: artistNameY,
      size: artistNameFontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
      maxWidth: width - pagePadding * 2
   });

   // Drawing release date
   if (albumData.release_date_precision === "day") {
      const releaseDateSplit = albumData.release_date.split("-");
      const releaseYear = releaseDateSplit[0];
      const releaseMonth = releaseDateSplit[1];
      const releaseDay = releaseDateSplit[2];

      const releaseMonthName = monthNames[releaseMonth - 1];
      const releaseDateText = `${releaseMonthName} ${releaseDay}, ${releaseYear}`;
      const releaseDateWidth = helvetica.widthOfTextAtSize(releaseDateText, releaseDateFontSize);

      page.drawText(releaseDateText, {
         x: width - pagePadding - releaseDateWidth,
         y: artistNameY,
         size: releaseDateFontSize,
         font: helvetica,
         color: rgb(0, 0, 0),
         maxWidth: width - pagePadding * 2
      });
   }

   // Drawing separation line
   const separationLineY = artistNameY - topSectionSpacing - separationLineHeight;
   page.drawLine({
      start: {x: pagePadding, y: separationLineY},
      end: {x: width - pagePadding, y: separationLineY},
      thickness: separationLineHeight,
      color: rgb(0, 0, 0),
   });

   // Drawing all of the tracks

   // Working out values
   const tracksStartY = separationLineY - topSectionSpacing;
   const heightForTracks = tracksStartY - pagePadding;
   const trackTextHeight = helvetica.heightAtSize(trackNameFontSize);
   const tracksYSeparation = 5;
   const columnXSeparation = 20;

   const tracks = [...albumData.tracks.items];
   const tracksPerColumn = Math.floor(heightForTracks / (trackTextHeight + tracksYSeparation));
   const numberOfColumns = Math.ceil(tracks.length / tracksPerColumn);

   // Finding the largest track name per column
   const largestTrackNames = [];
   for (let columnStartIndex = 0; columnStartIndex < tracks.length; columnStartIndex += tracksPerColumn) {
      const columnTracks = tracks.slice(columnStartIndex, columnStartIndex + tracksPerColumn);
      let largestTrackNameWidth = 0;
      for (const track of columnTracks) {
         track.posterName = `${track.track_number}. ${track.name}`
         const trackWidth = helvetica.widthOfTextAtSize(track.posterName, trackNameFontSize);
         if (largestTrackNameWidth < trackWidth) {
            largestTrackNameWidth = trackWidth;
         }
      }

      largestTrackNames.push(largestTrackNameWidth)
   }

   // Drawing track names onto pdf
   let lastColumnX = 0;
   for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      let columnX;
      if (columnIndex !== 0) {
         columnX = lastColumnX + largestTrackNames[columnIndex - 1] + columnXSeparation;
      } else {
         columnX = pagePadding;
      }

      lastColumnX = columnX;

      for (let rowIndex = 0; rowIndex < tracksPerColumn; rowIndex++) {
         const track = tracks.shift();

         // We have run out of songs, this column will not be the full height
         if (track === undefined) {
            break;
         }

         const trackY = tracksStartY - (rowIndex * (trackTextHeight + tracksYSeparation)) - trackTextHeight;
         page.drawText(track.posterName, {
            x: columnX,
            y: trackY,
            size: trackNameFontSize,
            font: helvetica,
            color: rgb(0, 0, 0),
         });
      }
   }

   const pdfBytes = await pdfDoc.save();
   download(pdfBytes, `${albumName} poster.pdf`, "application/pdf");
}
