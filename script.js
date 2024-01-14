document.addEventListener('DOMContentLoaded', () => {
    const sortearButton = document.getElementById('sortearButton');
    const resultadoDiv = document.getElementById('resultado');
  
    // Defina a variável JSON com seus dados
    const dados = {
      amigos: [
        {
            "id": 1,
            "nome": "Nossa Senhora Aparecida",
            "dia": "12 de outubro",
            "mensagem": "Ó Maria Santíssima, que em vossa imagem querida de Aparecida, espalhais inúmeros benefícios sobre todo o Brasil",
            "oracao": "ORAR E SACRIFICAR-SE PELAS NECESSIDADES MATERIAIS E ESPIRITUAIS DO POVO BRASILEIRO"
        },
        {
            "id": 2,
            "nome": "São José, esposo de Nossa Senhora, Patrono Universal da Igreja",
            "dia": "19 de março",
            "mensagem": "E José acolheu Maria em sua casa (Mt 1,24)",
            "oracao": "ORAR E SACRIFICAR-SE PELA SANTIFICAÇÃO DOS HOMENS E SINCERA VIVÊNCIA DA UNIDADE E POBREZA NA IGREJA"
        },
        {
            "id": 3,
            "nome": "São Francisco de Assis",
            "dia": "04 de outubro",
            "mensagem": "“Tanto é o bem que eu espero, que toda pena para mim é deleite.”",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE CRESÇAMOS NA VIDA DE LOUVOR E NA FRATERNIDADE, TENDO UM CORAÇÃO APAIXONADO POR JESUS"
        },
        {
            "id": 4,
            "nome": "Santa Teresa de Jesus",
            "dia": "15 de outubro",
            "mensagem": "“Ditoso o coração enamorado que só em Deus coloca o pensamento.”",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE CRESÇAMOS NA VIVÊNCIA DA ORAÇÃO QUE NOS TORNA ENAMORADOS DE CRISTO"        
        },
        {
            "id": 5,
            "nome": "Santa Teresinha do Menino Jesus",
            "dia": "1 de outubro",
            "mensagem": "“Viver de amor é guardar dentro do peito Tesouro que se leva em vaso mortal”",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE TODOS CRESÇAMOS NA VIRTUDE DA CARIDADE E NO ARDOR MISSIONÁRIO"        
        },
        {
            "id": 6,
            "nome": "São João Paulo II",
            "dia": "22 de outubro",
            "mensagem": "“Queridos jovens, ide com confiança ao encontro de Jesus, e, como os novos santos, não tenhais medo de falar d’Ele! Porque Cristo é a resposta verdadeira para todas as perguntas sobre o homem e sobre o seu destino”",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE NÃO TENHAMOS MEDO DE ENTREGAR INCONDICIONALMENTE A NOSSA VIDA A DEUS"
        },
        {
            "id": 7,
            "nome": "São João Batista",
            "dia": "24 de junho",
            "mensagem": "“Eu batizo com água. No meio de vós, está alguém que não conheceis, aquele que vem depois de mim, do qual não sou digno de desatar a correia da sandália. ” (Jo 1,26-27)",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE EM TODAS AS NOSSAS AÇÕES CRISTO CRESÇA E CADA UM DE NÓS DIMINUA"
        },
        {
            "id": 8,
            "nome": "São João Apóstolo e Evangelista",
            "dia": "27 de dezembro",
            "mensagem": "“Quanto a nós, não podemos nos calar sobre o que vimos e ouvimos” (At 4,20)",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE EVANGELIZEMOS SEMPRE, EM TODOS OS LUGARES, COM OUSADIA E CRIATIVIDADE"
        },
        {
            "id": 9,
            "nome": "São Lucas Evangelista",
            "dia": "18 de outubro",
            "mensagem": "“Não vos preocupeis com o que haveis de dizer, pois o próprio Espírito Santo vos ensinará o que deveis falar.” (Mc 13,11)",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE PERMANEÇAMOS FIÉIS À DOUTRINA DA IGREJA"
        },
        {
            "id": 10,
            "nome": "São Marcos Evangelista",
            "dia": "25 de abril",
            "mensagem": "“Estes são os sinais que acompanharão aos que tiverem crido: em meu nome expulsarão demônios, falarão em novas línguas, pegarão em serpentes, e se beberem algum veneno mortífero, nada sofrerão; imporão as mãos sobre os enfermos e estes ficarão curados” (Mc 16,17)",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE NÓS TENHAMOS UM NOVO ARDOR NA EVANGELIZAÇÃO, RENOVANDO A GRAÇA DO NOSSO BATISMO"
        },
        {
            "id": 11,
            "nome": "São Mateus Apóstolo",
            "dia": "21 de setembro",
            "mensagem": "“... eleitos segundo a presciência de Deus Pai e santificados pelo Espírito para obedecer a Jesus Cristo...” (I Pe 1,2)",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE ACEITEMOS COM HUMILDADE, GRATIDÃO E FIDELIDADE O CHAMADO PARTICULAR QUE DEUS FEZ A CADA UM DE NÓS"
        },
        {
            "id": 12,
            "nome": "São Tomé",
            "dia": "03 de julho",
            "mensagem": "“Meu Senhor e meu Deus!” (Jo 20, 28)",
            "oracao": "ORAR E SACRIFICAR-SE PELOS QUE ESTÃO SENDO TENTADOS EM SUA FÉ"
        },
        {
            "id": 14,
            "nome": "Santa Maria Madalena",
            "dia": "22 de julho",
            "mensagem": "“Jesus lhe diz: ‘Mulher, por que choras? A quem procuras?’ Pensando em ser o jardineiro, ela lhe diz:’Senhor, se fostes tu que o levaste, dize-me onde o puseste e eu o irei buscar!’ Diz-lhe Jesus: ‘Maria!’ Voltando-se, ela lhe diz em hebraico: ‘Rabbuni!’, que quer dizer: ‘Mestre’.” (Jo 20,15-16)",
            "oracao": "ORAR E SACRIFICAR-SE POR TODOS OS QUE ESTÃO SENDO TENTADOS PELO ESPÍRITO DO MUNDO E PELAS FRAQUEZAS DE SUA CARNE"
        },
        {
            "id": 15,
            "nome": "São Tiago",
            "dia": "25 de julho",
            "mensagem": "“Aquele que não peca ao falar é realmente um homem perfeito, capaz de refrear todo o seu corpo” (Tg 3,2)",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE CRESÇAMOS NO AUTO-DOMÍNIO E NÃO CAIAMOS NA TENTAÇÃO DOS “PECADOS DA LÍNGUA”"
        },
        {
            "id": 16,
            "nome": "Santo André, Apóstolo",
            "dia": "30 de novembro",
            "mensagem": "“Disse André a seu irmão: Encontramos o Messias, que é chamado o Cristo. E o conduziu a Jesus.” (Jo 1,41-42)",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE SEJAMOS FIÉIS NO CUMPRIMENTO DA MISSÃO QUE O SENHOR TEM PARA NÓS NA IGREJA, PESSOAL E COMUNITARIAMENTE"
        },
        {
            "id": 17,
            "nome": "São Barnabé, Apóstolo",
            "dia": "11 de junho",
            "mensagem": "“Entretanto, partiu Barnabé para Tarso, à procura de Saulo. De lá, encontrando-o, conduziu-o à Antioquia. Durante um ano inteiro conviveram na Igreja e ensinaram numerosa multidão.” (At 11,25)",
            "oracao": "ORAR E SACRIFICAR-SE PELO ESPÍRITO DE SERVIÇO E HUMILDADE, LEALDADE, AMIZADE SINCERA E FIDELIDADE AO CARISMA DE TODOS OS “COMPANHEIROS” DOS QUE ESTÃO À FRENTE DA OBRA E POR TODOS BENFEITORES"
        },
        {
            "id": 18,
            "nome": "São Timóteo",
            "dia": "26 de janeiro",
            "mensagem": "“Tu, pois, meu filho, fortifica-te na graça que está em Cristo Jesus (...) Assume a tua parte de sofrimento, como um bom soldado de Cristo Jesus.” (Tim 2,1.3)",
            "oracao": "ORAR E SACRIFICAR-SE PELA EVANGELIZAÇÃO DOS JOVENS"
        },
        {
            "id": 19,
            "nome": "Santo Estêvão",
            "dia": "26 de dezembro",
            "mensagem": "“O meu corpo é por vós lapidado e minh’alma se abraça convosco” (Liturgia das Horas)",
            "oracao": "ORAR E SACRIFICAR-SE (JEJUAR) PELOS POBRES E SOFREDORES"
        },
        {
            "id": 20,
            "nome": "Os Santos Inocentes, Mártires",
            "dia": "28 de dezembro",
            "mensagem": "“Ouvindo-a, Maria perde o olhar no tempo compreendido na palavra hoje. Seu pranto, unido ao de Raquel, um só com a mãe de Moisés, agora entende, seria cada vez mais um pranto só seu, pelo tempo sem fim, pois era o seu Menino que queriam. É o seu Menino que querem, é o seu Menino que quererão, sempre.” (Filho de Deus, Menino Meu, p. 111)",
            "oracao": "ORAR E SACRIFICAR-SE PELAS CRIANÇAS EM PERIGO DE MORTE DEVIDO A ENFERMIDADES, À VIOLÊNCIA E, EM ESPECIAL, DEVIDO AO ABORTO"
        },
        {
            "id": 21,
            "nome": "São Pedro",
            "dia": "29 de junho",
            "mensagem": "“Satanás pediu para te joeirar como o trigo, mas eu intercedi por ti” (Lc 22,31)",
            "oracao": "ORAR E SACRIFICAR-SE PELO PAPA, PELOS BISPOS, E POR TODA A IGREJA"
        },
        {
            "id": 22,
            "nome": "São Paulo",
            "dia": "25 de janeiro",
            "mensagem": "“O selo do meu apostolado sois vós, no Senhor” (I Cor 9,2)",
            "oracao": "ORAR E SACRIFICAR-SE PELA EXPANSÃO DO EVANGELHO ATÉ OS CONFINS DA TERRA"
        },
        {
            "id": 23,
            "nome": "São Miguel Arcanjo",
            "dia": "29 de setembro",
            "mensagem": "“Quem como Deus?”",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE TODOS CRESÇAMOS NO DISCERNIMENTO ESPIRITUAL E NA VIRTUDE DA HUMILDADE E OBEDIÊNCIA"
        },
        {
            "id": 24,
            "nome": "São Gabriel Arcanjo",
            "dia": "29 de setembro",
            "mensagem": "“O Espírito Santo virá sobre ti e o poder do Altíssimo vai te cobrir com a sua sombra” (Lc 1,35)",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE TODOS CRESÇAMOS NA VIVÊNCIA E NO ANÚNCIO DA ESPERANÇA E DA ALEGRIA DA SALVAÇÃO E TAMBÉM EM DISPONIBILIDADE E ABERTURA À VONTADE DE DEUS"
        },
        {
            "id": 25,
            "nome": "São Rafael Arcanjo",
            "dia": "29 de setembro",
            "mensagem": "“Manifestai a todos os homens as ações de Deus, como elas o merecem, e não vos canseis de dar-lhe graças. É bom manter oculto o segredo do rei; porém, é justo revelar e publicar as obras de Deus.” (Tb 12,6s)",
            "oracao": "ORAR E SACRIFICAR-SE PELA CURA DE NOSSAS CEGUEIRAS ESPIRITUAIS"
        },
        {
            "id": 26,
            "nome": "Nossa Senhora de Guadalupe",
            "dia": "12 de dezembro",
            "mensagem": "”Eu sou a sempre Virgem Maria, Mãe do verdadeiro Deus, por quem se vive. Desejo vivamente que me construa aqui um templo, para nele mostrar e prodigalizar todo meu amor, compaixão, auxílio e defesa a todos os moradores desta terra e a todos os que me invoquem e em Mim confiem” (Palavras de Nossa Senhora ao Índio Juan Diego)",
            "oracao": "ORAR E SACRIFICAR-SE PELA EVANGELIZAÇÃO DOS POVOS DA AMÉRICA LATINA"
        },
        {
            "id": 27,
            "nome": "Santa Madre Teresa de Calcutá",
            "dia": "05 de setembro",
            "mensagem": "“Por vezes sentimos que aquilo que fazemos não é senão uma gota de água no mar. Mas o mar seria menor se lhe faltasse uma gota.”",
            "oracao": "ORAR E SACRIFICAR-SE POR TODOS OS QUE SE SENTEM ABANDONADOS E SOLITÁRIOS"
        },
        {
            "id": 28,
            "nome": "Santo Padre Pio",
            "dia": "23 de setembro",
            "mensagem": "“Diante de Deus ajoelhe-se sempre”.",
            "oracao": "ORAR E SACRIFICAR-SE PELA INTEIRA DOCILIDADE DE CADA UM DE NÓS À SANTA VONTADE DE DEUS"
        },
        {
            "id": 29,
            "nome": "Santa Clara, Virgem",
            "dia": "11 de agosto",
            "mensagem": "“Deus, Francisco! Deus! Deus!”",
            "oracao": "ORAR E SACRIFICAR-SE PELA PUREZA, INOCÊNCIA, POBREZA E CASTIDADE DOS JOVENS"
        },
        {
            "id": 30,
            "nome": "Santo Agostinho, Bispo e Doutor da Igreja",
            "dia": "28 de agosto",
            "mensagem": "“Tarde de amei, ó Beleza sempre antiga e sempre nova! Vós chamastes e gritastes e rompestes-me a surdez”",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE TODOS CONHEÇAM E DISCIRNAM A SUA VOCAÇÃO"
        },
        {
            "id": 31,
            "nome": "São Luis Martin e Santa Zélia Guerin",
            "dia": "12 de julho",
            "mensagem": "“O Bom Deus me deu um pai e uma mãe mais dignos do Céu que da terra” (Santa Teresinha)",
            "oracao": "ORAR E SACRIFICAR-SE PELA SANTIFICAÇÃO DAS FAMÍLIAS"
        },
        {
            "id": 32,
            "nome": "Santa Gianna Beretta Molla",
            "dia": "28 de abril",
            "mensagem": "“Pureza: retirar tudo o que possa ofuscar a graça santificante em nós; recorrer a todos os meios para aumentá-la.”",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE POSSAMOS SER TESTEMUNHAS DE AMOR E RESPEITO À VIDA"
        },
        {
            "id": 33,
            "nome": "São Luis Maria Grignon de Montfort",
            "dia": "28 de abril",
            "mensagem": "“Não penses, alma caríssima, que Maria, a mais fecunda de todas as puras criaturas, e que chegou ao ponto de produzir um Deus, permaneça ociosa numa alma fiel. Fá-la-á viver continuamente em Jesus Cristo e Jesus Cristo nela...”",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE CRESÇA O AMOR À NOSSA SENHORA EM NOSSO MEIO"
        },
        {
            "id": 34,
            "nome": "Santa Mônica",
            "dia": "27 de agosto",
            "mensagem": "“Uma única coisa me fazia desejar viver ainda um pouco, ver-te cristão antes de morrer.”",
            "oracao": "ORAR E SACRIFICAR-SE PELOS QUE NÃO CREEM EM DEUS"
        },
        {
            "id": 35,
            "nome": "São João da Cruz",
            "dia": "14 de dezembro",
            "mensagem": "“No Amado acho as montanhas, os vales solitários, numerosos, as ilhas mais estranhas, os rios rumorosos e o sussurro dos ares amorosos; a música calada, a solidão sonora, a ceia que recreia e que enamora.”",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE CRESÇAMOS NA ASCESE E NO AMOR ESPONSAL A NOSSO SENHOR JESUS CRISTO"
        },
        {
            "id": 36,
            "nome": "Santa Teresa de Los Andes",
            "dia": "13 de julho",
            "mensagem": "“Quisera fazer as pessoas compreenderem que a Eucaristia é um céu, posto que o céu não é senão um sacrário sem portas, uma Eucaristia sem véus, uma comunhão sem fim.”",
            "oracao": "ORAR E SACRIFICAR-SE PELOS QUE PASSAM POR DIFICULDADES EM SUA VIDA DE ORAÇÃO"
        },
        {
            "id": 37,
            "nome": "Santa Teresa Benedita da Cruz - Edith Stein",
            "dia": "09 de agosto",
            "mensagem": "”Cada mulher seja uma cópia da Mãe de Deus, seja uma esposa de Cristo, seja uma apóstola do Coração Divino. Todas, então, corresponderão plenamente à sua vocação feminina, independentemente das circunstâncias e das atividades exteriores nas quais realizam as tarefas desenvolvidas”.",
            "oracao": "ORAR E SACRIFICAR-SE PELA SANTIFICAÇÃO DAS MULHERES E PELA ILUMINAÇÃO DOS JUDEUS"
        },
        {
            "id": 38,
            "nome": "São João Bosco",
            "dia": "31 de janeiro",
            "mensagem": "“A humildade é a fonte de toda a tranquilidade”",
            "oracao": "ORAR E SACRIFICAR-SE PELA EVANGELIZAÇÃO DAS CRIANÇAS E ADOLESCENTES, EM ESPECIAL PELOS QUE VIVEM NA RUA"
        },
        {
            "id": 39,
            "nome": "Santo Alberto Hurtado",
            "dia": "18 de agosto",
            "mensagem": "“Não há dúvidas de que as encíclicas, alocuções e documentos pontifícios se revestem de um grande interesse para todos os católicos! A palavra do Sumo Pontífice é sempre a do Pastor Universal dos fiéis e o seu ensinamento, não somente quando define dogmaticamente, mas também quando ensina de forma ordinária,tem a máxima autoridade na terra.”",
            "oracao": "ORAR E SACRIFICAR-SE PELO SANTO PADRE E POR TODA A IGREJA"
        },
        {
            "id": 40,
            "nome": "São Felipe Néri",
            "dia": "26 de maio",
            "mensagem": "“Ser misericordioso com os que caíram é melhor meio para não cairmos nós mesmos!”",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE SEJAMOS SEMEADORES DA SANTA ALEGRIA DOS FILHOS DE DEUS"
        },
        {
            "id": 41,
            "nome": "Santo Tomás de Aquino",
            "dia": "28 de janeiro",
            "mensagem": "“A onipotência de Deus reside em Sua Misericórdia”",
            "oracao": "ORAR E SACRIFICAR-SE PELA FORMAÇÃO E SANTIFICAÇÃO DOS SEMINARISTAS"
        },
        {
            "id": 42,
            "nome": "Santas Perpétua e Felicidade, Mártires",
            "dia": "7 de março",
            "mensagem": "“Aos pés da cruz de Jesus permaneciam de pé sua mãe, a irmã de sua mãe, Maria, mulher de Cléopas, e Maria Madalena.” (Jo 19,25)",
            "oracao": "ORAR E SACRIFICAR-SE PELA SANTIFICAÇÃO DAS MULHERES E POR SEU PAPEL NA COMUNIDADE E NA IGREJA"
        },
        {
            "id": 43,
            "nome": "São Maximiliano Kolbe",
            "dia": "14 de agosto",
            "mensagem": "“O progresso ou é espiritual ou não é progresso”",
            "oracao": "ORAR E SACRIFICAR-SE PELA EVANGELIZAÇÃO DO MUNDO DA CULTURA"
        },
        {
            "id": 44,
            "nome": "Santos Mártires do Rio Grande do Norte",
            "dia": "03 de outubro",
            "mensagem": "“Aquele que quiser salvar a sua vida, irá perdê-la, mas o que perder a vida por causa de mim e do Evangelho, irá salvá-la” (Mc 8,35)",
            "oracao": "ORAR E SACRIFICAR-SE PELA EVANGELIZAÇÃO DO POVO BRASILEIRO"
        },
        {
            "id": 45,
            "nome": "Beata Chiara Luce Badano",
            "dia": "29 de outubro",
            "mensagem": "“Se Jesus o quer, também eu o quero”",
            "oracao": "ORAR E SACRIFICAR-SE PELOS JOVENS ATEUS"
        },
        {
            "id": 46,
            "nome": "Santa Dulce dos Pobres",
            "dia": "13 de agosto",
            "mensagem": "“Deus não atende a todos nós? Não é Ele quem nos dá o ar, a luz, a saúde? Ele recusa alguma coisa quando pedimos com fé, com esperança? Como vamos recusar um pedido de nosso semelhante, do nosso próximo?”",
            "oracao": "ORAR E SACRIFICAR-SE PELOS POBRES"
        },
        {
            "id": 47,
            "nome": "São Bernardo de Claraval, Abade e Doutor da Igreja",
            "dia": "20 de agosto",
            "mensagem": "“A este pequeno menino cujos olhos dão a luz, de tal forma livres de toda malícia que recebem o canto do mundo”",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE CRESÇAMOS NO AMOR POR NOSSA SENHORA E PELA ENCARNAÇÃO DO VERBO"
        },
        {
            "id": 48,
            "nome": "São José de Anchieta",
            "dia": "09 de junho",
            "mensagem": "“Suportamos tudo isso, por amor dos eleitos”",
            "oracao": "ORAR E SACRIFICAR-SE PELA EVANGELIZAÇÃO DO PAULISTA"
        },
        {
            "id": 49,
            "nome": "Marthe Robin - Serva de Deus",
            "dia": "",
            "mensagem": "“Jesus, eu te agradeço porque nos aceitas como nós somos e nos ofereces ao Pai como tu és.”",
            "oracao": "ORAR E SACRIFICAR-SE POR TODOS OS IRMÃOS ENFERMOS DA COMUNIDADE PARA QUE UNIDOS A CRISTO ANUNCIEM À SUA PAIXÃO"
        },
        {
            "id": 50,
            "nome": "Santa Faustina",
            "dia": "05 de outubro",
            "mensagem": "“Que não se faça a minha vontade, mas a tua, ó Deus. Saiba que essas palavras, pronunciadas do fundo do coração, transportam a alma em um instante ao cume da santidade” (Palavras de Jesus à Irmã Faustina)",
            "oracao": "ORAR E SACRIFICAR-SE PELAS ALMAS DO PURGATÓRIO E PELA CONVERSÃO DOS PECADORES"
        },
        {
            "id": 51,
            "nome": "Santa Rita de Cássia",
            "dia": "22 de maio",
            "mensagem": "“Porque a Deus nenhuma coisa é impossível” (Lc 1,37)",
            "oracao": "ORAR E SACRIFICAR-SE PELA SANTIFICAÇÃO DOS MATRIMÔNIOS"
        },
        {
            "id": 52,
            "nome": "São Francisco de Sales",
            "dia": "24 de Janeiro",
            "mensagem": "“Tenha paciência com todas as coisas, mas principalmente tenha paciência consigo mesmo... A cada dia que se inicia, comece a tarefa de novo.”",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE SEJAMOS INSTRUMENTOS DA TERNURA E DA MISERICÓRDIA PARA TODOS QUE ENCONTRARMOS EM NOSSO CAMINHO"
        },
        {
            "id": 53,
            "nome": "São Bento",
            "dia": "11 de julho",
            "mensagem": "“A Cruz Sagrada seja minha luz, Não seja o Dragão meu guia, Retira-te Satanás, Nunca me aconselhes coisas vãs, É mal o que tu me ofereces, Bebe tu mesmo do teu veneno.”",
            "oracao": "ORAR E SACRIFICAR-SE PELA NOVA EVANGELIZAÇÃO DA EUROPA"
        },
        {
            "id": 54,
            "nome": "São Francisco Xavier",
            "dia": "03 de dezembro",
            "mensagem": "“Abrasado pelo amor a Deus, Francisco Xavier inflamou os lugares por ele evangelizados, com o fogo do amor divino e o brilho de seus milagres.”",
            "oracao": "ORAR E SACRIFICAR-SE PELA EVANGELIZAÇÃO DA ÁSIA"
        },
        {
            "id": 55,
            "nome": "Servo de Deus Jacques Fesch",
            "dia": "",
            "mensagem": "“Senhor, não me abandone, eu confio em Ti!” (Suas últimas palavras, antes da sua morte.)",
            "oracao": "ORAR E SACRIFICAR-SE PELA CONVERSÃO DAS ALMAS EM PECADO MORTAL"
        },
        {
            "id": 56,
            "nome": "Santa Josefina Bakhita",
            "dia": "08 de fevereiro",
            "mensagem": "“Eu estive sempre no meio da lama, mas não me sujei. Nossa Senhora me protegeu, ainda que eu não A conhecesse. ”",
            "oracao": "ORAR E SACRIFICAR-SE PELA EVANGELIZAÇÃO NA ÁFRICA"
        },
        {
            "id": 57,
            "nome": "Serva de Deus Leônia Martin",
            "dia": "",
            "mensagem": "“Não tinha as qualidades humanas de suas outras irmãs, mas soube abandonar-se em Deus, que chama a todos independentemente de nossas qualidades, ninguém fica excluído no chamado à santidade.” (Pe. Antonio Sangalli, postulador da causa)",
            "oracao": "ORAR E SACRIFICAR-SE PELA NOSSA SANTIFICAÇÃO PESSOAL E COMUNITÁRIA"
        },
        {
            "id": 58,
            "nome": "São José Sánchez del Río",
            "dia": "20 de novembro",
            "mensagem": "“Viva Cristo Rei!”",
            "oracao": "ORAR E SACRIFICAR-SE PELA EVANGELIZAÇÃO DAS CRIANÇAS"
        },
        {
            "id": 59,
            "nome": "São José Gabriel Del Rosario Brochero",
            "dia": "16 de março",
            "mensagem": "“Agora eu tenho tudo pronto para a jornada.” (Suas últimas palavras, antes da sua morte)",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE SEJAMOS INSTRUMENTOS DO CONSOLO DE DEUS AOS QUE SOFREM ENFERMIDADES FÍSICAS"
        },
        {
            "id": 60,
            "nome": "Santa Gemma Galgani",
            "dia": "11 de abril",
            "mensagem": "“Comungar é participar da festa do amor de Jesus.”",
            "oracao": "ORAR E SACRIFICAR-SE PELA VITALIDADE DA NOSSA VIDA INTERIOR"
        },
        {
            "id": 61,
            "nome": "Santo Agostinho Zhao Rong e 119 Companheiros, mártires na China",
            "dia": "09 de julho",
            "mensagem": "“Combati o bom combate, acabei a carreira, guardei a fé.” (2 Tim 4,7)",
            "oracao": "ORAR E SACRIFICAR-SE PELA DIFUSÃO DO CARISMA E DA OBRA NA ÁSIA"
        },
        {
            "id": 62,
            "nome": "Beata Chiara Corbella Petrillo",
            "dia": "",
            "mensagem": "“Aquilo que Deus quer para nós é muito mais belo do que tudo que poderíamos pedir com a nossa imaginação.”",
            "oracao": "ORAR E SACRIFICAR-SE PELA SANTIFICAÇÃO DAS FAMÍLIAS"
        },
        {
            "id": 63,
            "nome": "Servo de Deus Guido Schäffer",
            "dia": "",
            "mensagem": "“A verdadeira liberdade é aquela que se funda no amor e elege o bem.”",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE TENHAMOS UM RENOVADO ARDOR EVANGELIZADOR"
        },
        {
            "id": 64,
            "nome": "Servo de Deus Van Thuan",
            "dia": "",
            "mensagem": "“Não é raro, no mundo moderno, nos sentirmos derrotados. Mas a aventura da esperança nos leva além. Um dia eu encontrei escrito sob um calendário estas palavras: «O mundo é de quem o ama e sabe melhor dar prova disso». Quanto são verdadeiras estas palavras! No coração de cada pessoa existe uma infinita sede de amor e nós, com o amor que Deus efundiu nos nossos corações, podemos saciá-la. ”",
            "oracao": "ORAR E SACRIFICAR-SE PELA DIFUSÃO DO CARISMA NA ÁSIA"
        },
        {
            "id": 65,
            "nome": "São Damião de Molokai",
            "dia": "10 de maio",
            "mensagem": "“Este é um homem que será um pai para vós, e que vos ama de tal maneira que não teme ao voltar-se para vós, viverá e morrerá convosco.” (Palavras do Bispo na sua apresentação aos colonos da Ilha de Molokai)",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE SEJAMOS SENSÍVEIS E PRÓXIMOS AOS QUE SOFREM"
        },
        {
            "id": 66,
            "nome": "São Giuseppe Moscati",
            "dia": "16 de novembro",
            "mensagem": "“O homem que a partir de hoje nós invocaremos como um Santo da Igreja universal representa para nós a realização concreta do leigo cristão” (João Paulo II, em sua canonização)",
            "oracao": "ORAR E SACRIFICAR-SE PELA MISSÃO DOS LEIGOS NA IGREJA"
        },
        {
            "id": 67,
            "nome": "Santo André Bessette",
            "dia": "09 de agosto",
            "mensagem": "“Eu não sou nada... sou apenas uma ferramenta nas mãos da Providência, um humilde instrumento a serviço de São José.”",
            "oracao": "ORAR E SACRIFICAR-SE PELA DIFUSÃO DO CARISMA E DA OBRA NO CANADÁ"
        },
        {
            "id": 68,
            "nome": "Santo Antônio de Sant’Anna Galvão",
            "dia": "25 de outubro",
            "mensagem": "“Depois do parto permanecestes Virgem, Mãe de Deus, intercedeis por nós.”",
            "oracao": "ORAR E SACRIFICAR-SE PELOS QUE SOFREM NO CORPO E NA ALMA"
        },
        {
            "id": 69,
            "nome": "Santos Francisco e Jacinta Marto, pastorinhos de Fátima",
            "dia": "20 de fevereiro",
            "mensagem": "“Devo estar convencido de que meu próximo é sempre melhor do que eu, e por isso, digno do maior respeito.”",
            "oracao": "ORAR E SACRIFICAR-SE PELA CONVERSÃO DOS PECADORES"
        },
        {
            "id": 70,
            "nome": "Beato Carlo Acutis",
            "dia": "",
            "mensagem": "“Estar sempre com Jesus, este é o meu projeto de vida.”",
            "oracao": "ORAR E SACRIFICAR-SE PELA IGREJA E PELAS INTENÇÕES DO PAPA"
        },
        {
            "id": 71,
            "nome": "Beata Laura Vicuña",
            "dia": "22 de janeiro",
            "mensagem": "“Senhor, que eu sofra tudo o que Vos pareça bem, mas que minha mãe se converta e se salve”",
            "oracao": "ORAR E SACRIFICAR-SE PELA CONVERSÃO DAS FAMÍLIAS"
        },
        {
            "id": 72,
            "nome": "São Roque González de Santa Cruz",
            "dia": "17 de novembro",
            "mensagem": "“Contudo, quando prego o evangelho, não posso me orgulhar, pois me é imposta a necessidade de pregar. Ai de mim se não pregar o evangelho” (1 Cor 9, 16)",
            "oracao": "ORAR E SACRIFICAR-SE PELA DIFUSÃO DO CARISMA NA REGIÃO SUL DO BRASIL"
        },
        {
            "id": 73,
            "nome": "Santa Rosa de Lima",
            "dia": "23 de agosto",
            "mensagem": "“De certa forma, essa mulher é uma personificação da Igreja da América Latina: imersa em sofrimentos, desprovida de meios materiais e de um poder significativos, mas tomada pelo íntimo ardor causado pela proximidade de Jesus Cristo.” (Cardeal Ratzinger: Homilia no Santuário de Santa Rosa de Lima, Peru, em 19 de julho de 1986)",
            "oracao": "ORAR E SACRIFICAR-SE PELA DIFUSÃO DO CARISMA NA AMÉRICA LATINA"
        },
        {
            "id": 74,
            "nome": "Santa Paulina do Coração Agonizante de Jesus",
            "dia": "09 de julho",
            "mensagem": "“A boa vontade em servir a Deus nos mostra que a doação enobrece o caráter.”",
            "oracao": "ORAR E SACRIFICAR-SE PELA DIFUSÃO DO CARISMA NO SUL DO BRASIL"
        },
        {
            "id": 75,
            "nome": "Santa Laura Montoya",
            "dia": "21 de outubro",
            "mensagem": "“Somos dois sedentos, meu Jesus: Tu, de almas e eu de matar a tua sede. O que nos impede então?”",
            "oracao": "ORAR E SACRIFICAR-SE PELA DIFUSÃO DO CARISMA NA COLÔMBIA"
        },
        {
            "id": 76,
            "nome": "São Domingos Sávio",
            "dia": "06 de maio",
            "mensagem": "“Antes morrer do que pecar!”",
            "oracao": "ORAR E SACRIFICAR-SE PELO PROJETO CRIANÇA"
        },
        {
            "id": 77,
            "nome": "Nossa Senhora de Nazaré",
            "dia": "2o domingo de outubro",
            "mensagem": "“Senhora de Nazaré! Meu coração em teu louvor sangra, queima, se renova e dança, faz-se de amor por ti. Toma-me para sempre em tua devoção.”",
            "oracao": "ORAR E SACRIFICAR-SE PELA DIFUSÃO DO CARISMA NO NORTE DO BRASIL"
        },    
        {
            "id": 78,
            "nome": "Beato Pier Giorgio Frassati",
            "dia": "04 de julho",
            "mensagem": "“No Mundo que se afastou de Deus falta a Paz, mas também falta a Caridade, ou seja, o Amor verdadeiro e perfeito. Não há nada mais belo do que a Caridade. De fato, a fé e a esperança, cessam com a nossa morte, mas o Amor dura eternamente, e até creio que será mais viva na outra vida.”",
            "oracao": "ORAR E SACRIFICAR-SE PELA VIVÊNCIA DA RADICALIDADE EVANGÉLICA NA COMUNIDADE E NA OBRA"
        },
        {
            "id": 79,
            "nome": "Serva de Deus Dorothy Day",
            "dia": "",
            "mensagem": "“Não podemos deixar de reconhecer o fato de que todos somos irmãos. Seja que um homem acredite ou não em Jesus Cristo, na sua encarnação, na sua vida aqui conosco, na sua crucificação e ressurreição; seja que acredite ou não em Deus, ainda assim, continuamos sendo todos filhos de um mesmo Pai.”",
            "oracao": "ORAR E SACRIFICAR-SE EM FAVOR DA DEFESA DA VIDA"
        },
        {
            "id": 80,
            "nome": "São João XXIII",
            "dia": "11 de outubro",
            "mensagem": "“Devo estar convencido de que meu próximo é sempre melhor do que eu, e por isso, digno do maior respeito.”",
            "oracao": "ORAR E SACRIFICAR-SE PELA PAZ MUNDIAL"
        },
        {
            "id": 81,
            "nome": "São Pedro Calungsod",
            "dia": "2 de abril",
            "mensagem": "“O Filho do homem veio para servir e dar a sua vida como resgate para muitos (Mc 10,45)”",
            "oracao": "ORAR E SACRIFICAR-SE PELA PAZ NOS PAÍSES EM CONFLITOS"
        },
        {
            "id": 82,
            "nome": "Beata Lindalva",
            "dia": "",
            "mensagem": "“Confia ao Senhor a tua sorte, espera n’Ele, e Ele agirá” (Sl 36, 5)",
            "oracao": "ORAR E SACRIFICAR-SE PELA VIVÊNCIA DA POBREZA NA COMUNIDADE"
        },
        {
            "id": 83,
            "nome": "Santa Maria Egipcia",
            "dia": "2 de abril",
            "mensagem": "“Maria, depois de Jesus é vossa a obra da minha redenção.”",
            "oracao": "ORAR E SACRIFICAR-SE PELO AMOR À SAGRADA EUCARISTIA"
        },
        {
            "id": 84,
            "nome": "Santa Maravilhas de Jesus",
            "dia": "11 de dezembro",
            "mensagem": "“O que Deus quiser, como Deus quiser, e quando Deus quiser”",
            "oracao": "ORAR E SACRIFICAR-SE PELO DESAGRAVO E REPARAÇÃO AO SAGRADO CORAÇÃO DE JESUS"
        },
        {
            "id": 85,
            "nome": "Monges de Tibhirine",
            "dia": "",
            "mensagem": "“É possível viver com os outros e inclusive de se amar mesmo tendo crenças diferentes.”",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE OS MISSIONÁRIOS SEJAM FIÉIS ATÉ O MARTÍRIO SE NECESSÁRIO"
        },
        {
            "id": 86,
            "nome": "Santa Cecília",
            "dia": "22 de novembro",
            "mensagem": "“Louvai-o, Exaltai-o! A Ele glória e louvor eternamente!”",
            "oracao": "ORAR E SACRIFICAR-SE PELOS MÚSICOS DA COMUNIDADE"
        },
        {
            "id": 87,
            "nome": "Beato Maria Eugênio do Menino Jesus",
            "dia": "",
            "mensagem": "“A grande prova de santidade não é a ausência de tentação ou de cansaço, mas de persistência no caminhar, no reagir, no prosseguir em direção a Deus”",
            "oracao": "ORAR E SACRIFICAR-SE PELA CONVERSÃO À SANTIDADE DO CORPO COMUNITÁRIO"
        },
        {
            "id": 88,
            "nome": "Santo Antônio de Pádua",
            "dia": "13 de junho",
            "mensagem": "“Se pregar Jesus, ele derrete os corações duros; se O invocar, adoça as amargas tentações; se pensar nele, ilumina teu coração; se O lê, ele te sacia a mente”",
            "oracao": "ORAR E SACRIFICAR-SE PELA RENOVAÇÃO DA FÉ NA IGREJA"
        },
        {
            "id": 89,
            "nome": "Santo Estevão",
            "dia": "26 de dezembro",
            "mensagem": "“Senhor Jesus, recebe o meu espírito”(At7,59)",
            "oracao": "ORAR E SACRIFICAR-SE PELOS DIÁCONOS"
        },
        {
            "id": 90,
            "nome": "Santa Helena",
            "dia": "26 de dezembro",
            "mensagem": "“Com este sinal vencerás”",
            "oracao": "ORAR E SACRIFICAR-SE PELAS MÃES"
        },
        {
            "id": 91,
            "nome": "São Tomás More",
            "dia": "22 de junho",
            "mensagem": "“Eu orarei com fervor a fim de que, apesar de terdes sido sobre esta terra os signatários de minha condenação, nós possamos nos reencontrar mais tarde no Céu, todos juntos, para nossa salvação eterna.” (Aos juízes que acabavam de condená-lo à morte)",
            "oracao": "ORAR E SACRIFICAR-SE PELA SANTIFICAÇÃO DOS POLÍTICOS DO MUNDO INTEIRO E PELA MISSÃO DOS CRISTÃOS NA POLÍTICA"
        },
        {
            "id": 92,
            "nome": "Santo Inácio de Antioquia",
            "dia": "17 de outubro",
            "mensagem": "“Meu espírito se sacrifica por vós, não somente agora, mas também quando eu chegar a Deus. Eu ainda estou exposto ao perigo, mas o Pai é fiel, em Jesus Cristo, para atender minha oração e a vossa. Que sejais encontrados nele sem reprovação.”",
            "oracao": "ORAR E SACRIFICAR-SE PELOS CRISTÃOS PERSEGUIDOS NA SÍRIA"
        },
        {
            "id": 93,
            "nome": "São João Maria Vianney, o Cura d’Ars",
            "dia": "04 de agosto",
            "mensagem": "“Recebei o Espírito Santo. Aqueles a quem perdoardes os pecados serão perdoados. Àqueles a quem os retiverdes ser-lhes-ão retidos.” (Jo 20, 22s)",
            "oracao": "ORAR E SACRIFICAR-SE PELO AUMENTO DAS VOCAÇÕES SACERDOTAIS"
        },
        {
            "id": 94,
            "nome": "Santo Antão, Abade",
            "dia": "17 de janeiro",
            "mensagem": "“Pois nosso combate não é contra o sangue nem contra a carne, mas contra(...) os dominadores deste mundo de trevas, contra os Espíritos do Mal que povoam as regiões celestiais” (Ef 6,11s)",
            "oracao": "ORAR E SACRIFICAR-SE PELOS QUE ESTÃO PASSANDO POR MOMENTOS DE GRANDE TENTAÇÃO E PELOS QUE ESTÃO EM PROCESSO DE LIBERTAÇÃO PSICOLÓGICA E ESPIRITUAL PARA QUE, EM SUA LUTA, A VITÓRIA SEJA DO SENHOR"
        },
        {
            "id": 95,
            "nome": "Beato Charles de Foucauld",
            "dia": "01 de dezembro",
            "mensagem": "“Meu Pai, eu me abandono a Ti. Faz de mim o que quiseres. O que fizeres de mim, eu Te agradeço.”",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE TENHAMOS UMA RENOVADA EXPERIÊNCIA DE FILIAÇÃO DIVINA"
        },
        {
            "id": 96,
            "nome": "São José Benedito Cottolengo",
            "dia": "30 de abril",
            "mensagem": "“Não vos preocupeis com a vida, com o que haveis de comer, nem com o corpo, quanto ao que haveis de vestir. Pois a vida é mais que o alimento e o corpo mais do que a roupa” (Lc 12,22)",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE CRESÇA NOSSA CONFIANÇA IRRESTRITA NA PROVIDÊNCIA DE DEUS DE FORMAS QUE O NOSSO VERDADEIRO PROGRESSO SEJA INTERIOR"
        },
        {
            "id": 97,
            "nome": "São Martinho de Lima",
            "dia": "30 de abril",
            "mensagem": "“Não vos preocupeis com a vida, com o que haveis de comer, nem com o corpo, quanto ao que haveis de vestir. Pois a vida é mais que o alimento e o corpo mais do que a roupa” (Lc 12,22)",
            "oracao": "ORAR E SACRIFICAR-SE PELA DIFUSÃO DO EVANGELHO NO CONTINENTE AFRICANO; ∙ Interceder pela Construção da Igreja do Ressuscitado que passou pela Cruz(Diaconia); ∙ Interceder pelos países em guerra e pelos refugiados africanos;"
        },
        {
            "id": 98,
            "nome": "Santa Catarina de Sena, Virgem e Doutora da Igreja",
            "dia": "29 de abril",
            "mensagem": "“O Senhor onipotente rechaçou o inimigo pelas mãos de uma mulher” (Jt16,5)",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE CRESÇAMOS NO AMOR E FREQÜÊNCIA À EUCARISTIA DIÁRIA"
        },
        {
            "id": 99,
            "nome": "Santa Elizabeth da Trindade",
            "dia": "08 de novembro",
            "mensagem": "“Não percamos um só sacrifício! Há tantos a recolher ao longo de um só dia!”",
            "oracao": "ORAR E SACRIFICAR-SE PELOS PAGÃOS E PELOS QUE NÃO CREEM NO DEUS UNO E TRINO"
        },
        {
            "id": 100,
            "nome": "Santo Cardeal John-Henry Newman",
            "dia": "9 de outubro",
            "mensagem": "“Se tivéssemos qualquer percepção real de Deus como Ele é, de nós mesmos como somos, não deveríamos nunca nos atrever a servi-lo sem temor, ou nos alegrar nEle sem estremecer.”",
            "oracao": "ORAR E SACRIFICAR-SE POR TODOS QUE ESTÃO LONGE DE DEUS, LONGE DA IGREJA CATÓLICA, LONGE DA VERDADE"
        },
        {
            "id": 101,
            "nome": "Santa Maria de Jesus Crucificado (Miriam, a carismática)",
            "dia": "25 de agosto",
            "mensagem": "“Sois vós que nos fazeis entender Jesus. Vinde meu consolador, vinde alegria minha, vinde minha paz, minha força, minha luz. Jesus disse que vos comunicaríeis com os ignorantes: eu sou a primeira entre os ignorantes. Não vos peço outra sabedoria e ciência que a ciência de encontrar Jesus e a sabedoria de retê-lo...Senti um fogo aceso no coração. O Espírito Santo não me nega nada.”",
            "oracao": "ORAR E SACRIFICAR-SE PELA PAZ NA TERRA SANTA"
        },
        {
            "id": 102,
            "nome": "São Richard de Arnsberg",
            "dia": "30 de dezembro",
            "mensagem": "“Vós mesmos sois a nossa carta, escrita em nosso coração, conhecida e lida por todos.” (2 Cor 3, 3)",
            "oracao": "ORAR E SACRIFICAR-SE PELOS IRMÃOS QUE TEM O DOM DE ESCREVER, PELA ASSISTÊNCIA DE FORMAÇÃO E EDIÇÕES SHALOM"
        },
        {
            "id": 103,
            "nome": "São Jerônimo",
            "dia": "30 de setembro",
            "mensagem": "“Ignorar as Escrituras é ignorar Cristo”",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE CRESÇAMOS NO AMOR, ZELO E DEDICAÇÃO AO ESTUDO DA PALAVRA DE DEUS"
        },
        {
            "id": 104,
            "nome": "São Paulo VI",
            "dia": "26 de setembro",
            "mensagem": "“Dar a Deus o que é de Deus” significa, por sua vez, “reconhecer e professar, mesmo diante de qualquer tipo de poder, que só Deus é o Senhor do homem e não há outro e abrir-se à sua vontade e dedicar-Lhe a nossa vida, cooperando para o seu Reino de misericórdia, amor e paz”. (Papa Francisco)",
            "oracao": "ORAR E SACRIFICAR-SE PARA QUE A IGREJA SEJA SEMPRE ABERTA À NOVIDADE DO ESPÍRITO SANTO"
        },
        {
            "id": 105,
            "nome": "São Pio V",
            "dia": "30 de abril",
            "mensagem": "“Corresponde a nós, luz do mundo e sal da terra, levar caridade aos espíritos e animar os corações com o exemplo de nossa santidade e de nossa virtude.”",
            "oracao": "ORAR E SACRIFICAR-SE PELOS CRISTÃOS DA EUROPA"
        }     
    ]    
    };
  
    function sortear() {
      const amigos = dados.amigos;
      if (amigos.length === 0) {
        console.error('Nenhum amigo disponível para sorteio');
        return null;
      }
  
      const idSorteado = Math.floor(Math.random() * amigos.length);
      const amigoSorteado = amigos[idSorteado];
      console.log('Amigo sorteado:', amigoSorteado ? amigoSorteado.nome : 'Não encontrado');
      return amigoSorteado;
    }
  
    sortearButton.addEventListener('click', () => {
        try {
          const amigoSorteado = sortear();
          if (amigoSorteado) {
            resultadoDiv.innerHTML = `
              <h2>Amigo sorteado:</h2>
              <p>Nome: ${amigoSorteado.nome}</p>
              <p>Dia: ${amigoSorteado.dia}</p>
              <p>Mensagem: ${amigoSorteado.mensagem}</p>
              <p>Oração: ${amigoSorteado.oracao}</p>
            `;
          } else {
            resultadoDiv.innerHTML = 'Nenhum amigo disponível para sorteio';
          }
        } catch (error) {
          resultadoDiv.innerHTML = `Erro: ${error.message}`;
        }
      });
  });
  