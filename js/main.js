const { createApp } = Vue;
const dt = luxon.DateTime;

const app = createApp({
  data() {
    return {
      contacts: [
        {
          name: "Michele",
          avatar: "./img/avatar_1.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "./img/avatar_2.jpg",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "./img/avatar_3.jpg",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "./img/avatar_4.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro L.",
          avatar: "./img/avatar_5.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
            },
          ],
        },
        {
          name: "Claudia",
          avatar: "./img/avatar_6.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novità?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
            },
          ],
        },
        {
          name: "Federico",
          avatar: "./img/avatar_7.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
            },
          ],
        },
        {
          name: "Davide",
          avatar: "./img/avatar_8.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
            },
          ],
        },
      ],
      activeChat: 0,
      newMexSent: {
        date: "",
        message: "",
        status: "sent",
      },
      newMexReceived: {
        date: "",
        message: "OK!",
        status: "received",
      },
      nameSearch: "",
    };
  },
  computed: {},
  methods: {
    /**
     * Imposta la chat attiva da visualizzare
     * @param {*} index
     */
    selectedChat(index) {
      this.activeChat = index;
    },

    /**
     * Restituisce Ora ultimo accesso basato sui messaggi ricevuti
     * controllo se non ci sono ultimi mex non stampa nulla
     * @param {*} messages
     * @returns
     */
    getContactLastAcces(messages) {
      const receivedMex = messages.filter(
        (message) => message.status == "received"
      );
      if (receivedMex.length == 0) {
        return;
      } else {
        return this.formatDate(receivedMex[receivedMex.length - 1].date);
      }
    },

    /**
     * Restituisce ultimo messaggio presente in chat
     * @param {*} messages
     * @returns
     */
    getLastMex(messages) {
      return messages[messages.length - 1].message;
    },
    /**
     * Prende ora e data correnti
     * @returns
     */
    getCurrentTime() {
      const now = new Date();
      const day = now.getDate() < 10 ? `0` + now.getDate() : now.getDate();
      const month =
        now.getMonth() + 1 < 10
          ? `0` + (now.getMonth() + 1)
          : now.getMonth() + 1;
      const hours = now.getHours() < 10 ? `0` + now.getHours() : now.getHours();
      const minutes =
        now.getMinutes() < 10 ? `0` + now.getMinutes() : now.getMinutes();
      const seconds =
        now.getSeconds() < 10 ? `0` + now.getSeconds() : now.getSeconds();

      return `${day}/${month}/${now.getFullYear()} ${hours}:${minutes}:${seconds}`;
    },

    /**
     * Formattazione con Luxon
     * @param {*} date
     * @returns una stringa in formato data come preferisco
     */
    formatDate(date) {
      /* CREO UN OBJ LUXON CHE RAPPRESENTA LA DATA E SPEFICICO COME LEGGERLO */
      const dateMex = dt.fromFormat(date, "dd/MM/yyyy HH:mm:ss");
      /* CONVERTO LA DATA IN UNA STRINGA COME PREFERISCO VEDERLA */
      const dateTex = dateMex.toLocaleString(dt.TIME_24_SIMPLE);
      return dateTex;
    },

    /**
     * Iinvia un messaggio, controllando che l'input non sia vuoto o con spazi, svuotandolo dopo
     * l'invio, parte dopo un sec il setTimeout della risposta
     */
    sentMex() {
      if (!this.newMexSent.message) {
        alert("Scrivi un messaggio con almeno un carattere");
      } else {
        const newMexSentCopy = { ...this.newMexSent };
        newMexSentCopy.date = this.getCurrentTime();
        this.contacts[this.activeChat].messages.push(newMexSentCopy);
        this.newMexSent.message = "";
        this.setTimeoutMex();
      }
    },

    /**
     * Aggiunge messaggio ricevuto all'arrey dei messaggi, di ogni obj in questione
     */
    receivedMex() {
      this.newMexReceived.date = this.getCurrentTime();
      this.contacts[this.activeChat].messages.push(this.newMexReceived);
    },

    /**
     * Funzione della risposta dopo un sec
     */
    setTimeoutMex() {
      setTimeout(this.receivedMex, 1000);
    },

    /**
     * Funzione che filtra l'array di contatti, in baso a quello ricercato
     * troverà indipendentemente se maiusc o minusc o con spazii iniziali e finali
     */
    searchbyName() {
      /* SI POTEVA ANCHE USARE UN FOR.EACH O SOVRASCRIVERE L'ARRAY CONTACS CON UN MAP DELLO STESSO */
      for (contact of this.contacts) {
        if (
          contact.name
            .toLowerCase()
            .includes(this.nameSearch.trim().toLowerCase())
        ) {
          contact.visible = true;
        } else {
          contact.visible = false;
        }
      }
    },

    /**
     * Eliminia il messaggio selezionato nella chat attiva dall'array dell'oggetto
     * grazie all'indice del messaggio presente nell'array di messaggi presente in ogni oggetto
     * @param {*} mex
     * @param {*} index
     */
    deleteMex(mex, index) {
      this.contacts[this.activeChat].messages.splice(index, 1);
    },
  },
  mounted() {},
});

app.mount("#root");
