/* for now only supports: conversations text, text contain mentions,
                          contacts, contacts array, image, video, audio,
                          document, sticker, locations, buttons.
*/

module.exports = async (d) => {
  const fs = require("fs");
  const b = require("@adiwajshing/baileys");
  const path = "./tmp/prepareSticker.webp";

  async function down(object, path, type) {
    const stream = await b.downloadContentFromMessage(object, type);

    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    await fs.writeFileSync(path, buffer);
  }

  if (!d.msg.message.extendedTextMessage) {
    return "";
  }

  const q = d.msg.message.extendedTextMessage.contextInfo.quotedMessage;
  const type = b.getContentType(q);
  var object = q[type];
  var str = JSON.stringify(object);
  object = JSON.parse(str);
  object.text = object?.description || object?.contentText;

  if (typeof object === "string") {
    return object;
  } else if (typeof object === "object") {
    if(type === "contactsArrayMessage") {
      delete object['text']
      d.unique = true;
      return {
        type: "allInOne",
        response: { contacts: { contacts: object.contacts }}
      }
    } else if(type === "locationMessage") {
      d.unique = true;
      return {
        type: "allInOne",
        response: { location: { degreesLatitude: object.degreesLatitude, degreesLongitude: object.degreesLongitude, name: object.name }}
      }
    } else if(type === "extendedTextMessage") {
      return q[type].text
    } else if(object.vcard) {
      delete object['text']
      d.unique = true;
      return {
        type: "allInOne",
        response: { contacts: { displayName: object.displayName, contacts: [{ vcard: object.vcard }] }}
      }
    } else if (object.url) {
      if (type === "stickerMessage") {
        if (object.url === "https://web.whatsapp.net") {
          object["url"] = "https://mmg.whatsapp.net" + object.directPath;
        }
        await down(object, path, "image");
        d.unique = true;
        return {
          type: "sticker",
          response: { url: path },
        };
      } else {
        const path2 = `./tmp/${
          type === "imageMessage"
            ? "quotedImage.png"
            : type === "audioMessage"
            ? "quotedAudio.mp3"
            : type === "documentMessage"
            ? object.title
            : type === "videoMessage"
            ? "quotedVideo.mp4"
            : undefined
        }`;

        const slicedType = type.slice(0, -7);
        await down(object, path2, slicedType);
        d.unique = true;
        return {
          type: slicedType,
          response:
            slicedType === "document"
              ? {
                  url: path2,
                  mimetype: `application/${path2.split(".").pop()}`,
                  filename: object.title,
                }
              : slicedType === "audio"
              ? {
                url: path2,
                mimetype: `audio/mp4`,
                ptt: object.ptt
              }
              : slicedType === "video"
              ? {
                url: path2,
                playback: object.gifPlayback
              } : path2,
        };
      }
    } else {
      d.unique = true;
      return {
        type: "allInOne",
        response: object,
      };
    }
  } else {
    return "";
  }
};
