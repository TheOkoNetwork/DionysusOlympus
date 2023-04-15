module.exports = {


  friendlyName: 'ImportTickets',


  description: 'Import tickets from external source.',


  fn: async function () {
    sails.log('Running custom shell script... (`sails run ticket`)');
    const externalSalesJSON = [
      [2128342141,'19/02/2023','paid','GBP',40,0,0,40,'Zoe','Adams','curlynewby@yahoo.com',7729435319,'hp219da','Alton Towers Resort - Group Waterpark Event 2023',5  ],
      [336848420,'19/02/2023','paid','GBP',24,0,0,24,'Darrel','Adams','darrelbob_adams@hotmail.com',7824669264,'PE330QS','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [1225966095,'17/02/2023','paid','GBP',32,0,0,32,'Rebecca','Aked','rebecca_aked@hotmail.co.uk',7850961347,'ST48UD','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1125917967,'15/02/2023','paid','GBP',32,0,0,32,'Kate','Allen','katereilly20@aol.co.uk',7977271559,'st50gb','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1993427644,'15/02/2023','paid','GBP',40,0,0,40,'Nicole','Ashton','nicole.ashton89@gmail.com',7833248628,'st7 2ny','Alton Towers Resort - Group Waterpark Event 2023',5  ],
      [1662851206,'19/02/2023','paid','GBP',16,0,0,16,'Lisa','Attwell','lisa1981_000@hotmail.com',7964561698,'NN15 6FX','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [1365384431,'19/02/2023','paid','GBP',24,0,0,24,'Rachel','Bailey-DaviesBailey-Davies','rachelbailey1985@yahoo.co.uk',7745085188,'WS13 6DA','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [725264848,'15/02/2023','paid','GBP',32,0,0,32,'Natasha','Baker','natashakerry12@googlemail.com',7847453996,'DE224dg','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1000184016,'17/02/2023','paid','GBP',24,0,0,24,'Donna','Bamford','donnabamford7@gmail.com',7886337610,'NG18 5QP','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [1308523578,'15/02/2023','paid','GBP',24,0,0,24,'Lisa','Banks','lisah1982@msn.com',7583663404,'st10 2bh','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [952104210,'15/02/2023','paid','GBP',32,0,0,32,'Leanne','Barker','leanne.barker@outlook.com',7973513868,'dy103yw','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1817849200,'15/02/2023','paid','GBP',16,0,0,16,'Lucy','Bennett','lucybennett72@yahoo.com',7972656768,'B755DP','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [1472968106,'15/02/2023','paid','GBP',16,0,0,16,'Sally','Bennett','sallybennett299@yahoo.co.uk',7788563303,'Np116ea','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [1741338802,'17/02/2023','paid','GBP',24,0,0,24,'Lisa','Bidnell','steve.i@hotmail.co.uk',7534534219,'sg1 1hz','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [2084868400,'15/02/2023','paid','GBP',40,0,0,40,'Victoria','Boddey','vic_boddey@sky.com',7982728009,'DE73 8BX','Alton Towers Resort - Group Waterpark Event 2023',5  ],
      [951644254,'19/02/2023','paid','GBP',32,0,0,32,'Peter','Bowers','pbbowers10@aol.co.uk',7894702818,'SY1 4HR','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [807334522,'15/02/2023','paid','GBP',40,0,0,40,'Leah','Bowley','leahbowley161@outlook.com',7879072178,'RG14 7SG','Alton Towers Resort - Group Waterpark Event 2023',5  ],
      [334277547,'17/02/2023','paid','GBP',48,0,0,48,'Stephanie','Bridgwater','stephbridgwater21@gmail.com',7541651049,'CV10 7BX','Alton Towers Resort - Group Waterpark Event 2023',6  ],
      [1523218871,'19/02/2023','paid','GBP',16,0,0,16,'Heather','Briley','hj.roedean@gmail.com',7940519428,'NG5 6NW','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [944771103,'15/02/2023','paid','GBP',32,0,0,32,'Paula','Briley-Dean','paulabrileyd@gmail.com',7399566029,'NG41AJ','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1567286479,'17/02/2023','paid','GBP',32,0,0,32,'Sueanne','Broadbent','sueannebroadbent@aol.com',7776137826,'SK224BR','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [684417754,'19/02/2023','paid','GBP',32,0,0,32,'Danielle','Brock','danniellebrock@hotmail.co.uk',7770950001,'TW17 8BB','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [422038946,'15/02/2023','paid','GBP',8,0,0,8,'Gareth','Brown','gazb67@gmail.com',7971535832,'WA4 2NQ','Alton Towers Resort - Group Waterpark Event 2023',1  ],
      [1410908842,'15/02/2023','paid','GBP',16,0,0,16,'Hayley','Buckley','hayle85@gmail.com',7803094970,'WS12 0FE','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [654808441,'15/02/2023','paid','GBP',16,0,0,16,'Hayley','Bunting','hayjax86@gmail.com',7526309100,'De130ls','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [1684345329,'15/02/2023','paid','GBP',40,0,0,40,'Amy','Canning','sweetlittle_one@hotmail.com',7736844398,'b72 1jg','Alton Towers Resort - Group Waterpark Event 2023',5  ],
      [1957294825,'15/02/2023','paid','GBP',48,0,0,48,'Emma','Carney','emmalcarney@outlook.com',7359009196,'wv112bu','Alton Towers Resort - Group Waterpark Event 2023',6  ],
      [1999885515,'15/02/2023','paid','GBP',24,0,0,24,'Victoria','Cooper','tinkerbelle84@hotmail.com',7850523870,'DE11 7JJ','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [1078191506,'15/02/2023','paid','GBP',24,0,0,24,'Katie','Cox','katiecox@outlook.com',7722024598,'ch43 9sw','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [1730386555,'15/02/2023','paid','GBP',32,0,0,32,'Ruth','Day','Ruth.day14@gmail.com',7568531253,'PO5 1ND','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1243608449,'17/02/2023','paid','GBP',48,0,0,48,'Mark','DuRose','m.durose@live.co.uk',7557774278,'B47 5LE','Alton Towers Resort - Group Waterpark Event 2023',6  ],
      [661628303,'15/02/2023','paid','GBP',48,0,0,48,'Katie','Evans','katey-ella@hotmail.co.uk',7592314346,'b71 3sn','Alton Towers Resort - Group Waterpark Event 2023',6  ],
      [311850365,'15/02/2023','paid','GBP',40,0,0,40,'Kerry','Evans','kezevans81@gmail.com',7568409301,'','Alton Towers Resort - Group Waterpark Event 2023',5  ],
      [1111233809,'17/02/2023','paid','GBP',48,0,0,48,'Carol','Facey','carolvfailey@googlemail.com',7588577206,'B435RX','Alton Towers Resort - Group Waterpark Event 2023',6  ],
      [1578609717,'15/02/2023','paid','GBP',40,0,0,40,'Dan','Farrington','xxsexy99@hotmail.co.uk',7488273364,'','Alton Towers Resort - Group Waterpark Event 2023',5  ],
      [2091563330,'19/02/2023','paid','GBP',40,0,0,40,'Nicola','Fitzgerald','nikkicfitz@hotmail.co.uk',7740191973,'CH49 6NX','Alton Towers Resort - Group Waterpark Event 2023',5  ],
      [2027375107,'15/02/2023','paid','GBP',24,0,0,24,'Anita','Ganday','neets07@hotmail.co.uk',7538300866,'NG104JB','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [396955018,'19/02/2023','paid','GBP',40,0,0,40,'Nicola','Guest','nicola_223@hotmail.com',7921457695,'BB4 7TZ','Alton Towers Resort - Group Waterpark Event 2023',5  ],
      [1811966663,'15/02/2023','paid','GBP',32,0,0,32,'Diane','Hall','dianehall@email.com',7733114136,'ST7 8BP','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [2129209143,'17/02/2023','paid','GBP',16,0,0,16,'Karen','Haslam','karen.haslam@gmail.com',7983982040,'BB5 5WW','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [1778882199,'15/02/2023','paid','GBP',32,0,0,32,'Jodie','HawksworthYou','jodie.hawksworth@sky.com',7790776841,'DE11 9GU','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1972235178,'17/02/2023','paid','GBP',24,0,0,24,'Nicola','Hodkinson','nicola.hodkinson@yahoo.co.uk',7772697676,'DE76ER','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [955111957,'19/02/2023','paid','GBP',32,0,0,32,'sasha','Jebb','sashayeomans149@aol.co.uk',7854847076,'sy30nx','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [454788356,'15/02/2023','paid','GBP',24,0,0,24,'Sarah','Johnson','sarah_titch8@hotmail.co.uk',7715404755,'NN2 6DR','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [1984009513,'15/02/2023','paid','GBP',32,0,0,32,'Samantha','Jones','sammy.lou2008@hotmail.co.uk',7990547325,'ws3 1jh','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [523821953,'19/02/2023','paid','GBP',24,0,0,24,'Steph','Jones','steph.jones@live.co.uk',7521164988,'rg424ge','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [405167083,'19/02/2023','paid','GBP',32,0,0,32,'Natalie','Judge','splat1986@ymail.com',7900007895,'wa2 9bg','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [675128492,'17/02/2023','paid','GBP',16,0,0,16,'Jacque','Kent-Robinson','jacque_2222@hotmail.co.uk',7880330665,'gl34wf','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [400285376,'15/02/2023','paid','GBP',24,0,0,24,'Emma','Kerslake','emmakerslake@hotmail.com',7752884211,'CV213NU','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [1350546152,'15/02/2023','paid','GBP',56,0,0,56,'Nicole','Koeckeritz','hexenbesen1981@hotmail.com',7812754322,'GU15 4EL','Alton Towers Resort - Group Waterpark Event 2023',7  ],
      [1966710028,'15/02/2023','paid','GBP',48,0,0,48,'Tracey','Lambert-jones','traceylj39@hotmail.co.uk',7710287332,'mk6 3jt','Alton Towers Resort - Group Waterpark Event 2023',6  ],
      [388770403,'17/02/2023','paid','GBP',32,0,0,32,'Jodie','Lawler','thelawlers2006@hotmail.com',7894311997,'ws154he','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1656557085,'19/02/2023','paid','GBP',48,0,0,48,'Kirsty','Liddle','kirstymcbride1@aol.com',7730343399,'DE22 2LB','Alton Towers Resort - Group Waterpark Event 2023',6  ],
      [1606462056,'15/02/2023','paid','GBP',24,0,0,24,'Lenka','Liskova','lenka.liskova@hotmail.com',7976942454,'NG51HF','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [956061451,'19/02/2023','paid','GBP',24,0,0,24,'Gemma','Lumley','gemmalumley31@gmail.com',7719099459,'SK10 2ER','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [1080749362,'19/02/2023','paid','GBP',40,0,0,40,'Angela','margerison','angela.margerison@yahoo.co.uk',7793776116,'bb32qr','Alton Towers Resort - Group Waterpark Event 2023',5  ],
      [1477169463,'19/02/2023','paid','GBP',16,0,0,16,'Sian','Margetson','millieellalee@sky.com',7798884383,'s818NU','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [572068434,'15/02/2023','paid','GBP',24,0,0,24,'Amy','Marshall','amymarshall83@sky.com',7724907832,'','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [1653334709,'17/02/2023','paid','GBP',16,0,0,16,'Elizabeth','Massey','lizi100@hotmail.com',7527951087,'DE73 6QU','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [1293253823,'19/02/2023','paid','GBP',40,0,0,40,'Annette','Mcminn','annetteronan@yahoo.co.uk',7739044472,'TW17 8BB','Alton Towers Resort - Group Waterpark Event 2023',5  ],
      [1371774349,'15/02/2023','paid','GBP',40,0,0,40,'Lara','Meyer','larajanemeyer@hotmail.com',7772128392,'LU2 8BL','Alton Towers Resort - Group Waterpark Event 2023',5  ],
      [275389312,'15/02/2023','paid','GBP',40,0,0,40,'Kara','Mikolajczyk','Kara404@msn.com',7545492349,'dy116pr','Alton Towers Resort - Group Waterpark Event 2023',5  ],
      [432069144,'15/02/2023','paid','GBP',32,0,0,32,'Emily','Miller','emilyleighmiller@gmail.com',7502393298,'SY3 7NN','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [604852006,'19/02/2023','paid','GBP',32,0,0,32,'Martin','Milward','millyward1986@googlemail.com',7796414160,'DE13 8NB','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [872962821,'19/02/2023','paid','GBP',40,0,0,40,'Martin','Milward','millyward1986@googlemail.com',7796414160,'DE13 8NB','Alton Towers Resort - Group Waterpark Event 2023',5  ],
      [851716402,'17/02/2023','paid','GBP',32,0,0,32,'Sacha','Moore','cousins_26@hotmail.com',7398557312,'b76 1DL','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1703465666,'15/02/2023','paid','GBP',32,0,0,32,'Timothy','Morgan','timmymorgan@gmail.com',7919142140,'RG6 7JU','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [42910386,'17/02/2023','paid','GBP',48,0,0,48,'Alice','Morley','alice.morley@btinternet.com',7814261180,'le5 6sn','Alton Towers Resort - Group Waterpark Event 2023',6  ],
      [951162863,'15/02/2023','paid','GBP',32,0,0,32,'Louise','Morris','loumorris85@gmail.com',7919174892,'wf9 1nt','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1049759746,'19/02/2023','paid','GBP',24,0,0,24,'Sue','Morris-Bateman','sem15@hotmail.co.uk',7917762220,'tf125fe','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [906894823,'16/02/2023','paid','GBP',24,0,0,24,'Jenny','Needham','jennyn2309@gmail.com',7554591719,'so45 2GG','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [1550711818,'15/02/2023','paid','GBP',32,0,0,32,'Sanna','Newton','sannamay055@Aol.com',7731040396,'PO9 3FE','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1759006455,'17/02/2023','paid','GBP',24,0,0,24,'Faye','Nyland','f.nyland@ntlworld.com',7876712840,'ng199nh','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [1984868505,'17/02/2023','paid','GBP',32,0,0,32,'Laura','Oakley','lsmith1000@aol.co.uk',7989426004,'DY2 9PQ','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1703822871,'19/02/2023','paid','GBP',16,0,0,16,'Chris','Oakley','lsmith1000@aol.co.uk',7989426004,'DY2 9PQ','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [1099616740,'15/02/2023','paid','GBP',32,0,0,32,'Amy','O\'BRIEN','amyesm@yahoo.com',7834376434,'HP19 9RG','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [118743497,'15/02/2023','paid','GBP',32,0,0,32,'Zoe','Oldham','zoekoldham@hotmail.co.uk',7741478758,'de4 3le','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1668757018,'15/02/2023','paid','GBP',32,0,0,32,'Clare','Pike','clare-pike@sky.com',7979247904,'sk6 2aj','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [2034783454,'17/02/2023','paid','GBP',32,0,0,32,'Danielle','Piper','piperdanielle82@googlemail.com',7835397528,'lu55at','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1541507389,'17/02/2023','paid','GBP',8,0,0,8,'Frances','Plummer','francesp22o@icloud.com',7736017846,'wd3 8yg','Alton Towers Resort - Group Waterpark Event 2023',1  ],
      [977855214,'15/02/2023','paid','GBP',16,0,0,16,'Lydia','Powell','lid_powell@hotmail.co.uk',7496513566,'NP11 6BG','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [1155621319,'17/02/2023','paid','GBP',24,0,0,24,'Meg','Priseman','meg.priseman@hotmail.com',7896348586,'B77 4JY','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [511530490,'15/02/2023','paid','GBP',32,0,0,32,'Alison','Proctor','alison_proctor@hotmail.com',7817931870,'st2 8ah','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1541603253,'15/02/2023','paid','GBP',48,0,0,48,'Kristie','Purcell','kristiepurcell@gmail.com',7511174908,'Nn16 9tn','Alton Towers Resort - Group Waterpark Event 2023',6  ],
      [71675821,'19/02/2023','paid','GBP',24,0,0,24,'Kristie','Purcell','kristiepurcell@gmail.com',7511174908,'nn16 9tn','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [543850985,'15/02/2023','paid','GBP',24,0,0,24,'Jemma','Raynes','jemraynes@hotmail.co.uk',7508054872,'St7 1lb','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [514046844,'17/02/2023','paid','GBP',8,0,0,8,'Gracie','Richardson','emmahone_1@hotmail.com',7541651049,'CV10 7BX','Alton Towers Resort - Group Waterpark Event 2023',1  ],
      [370004475,'15/02/2023','paid','GBP',32,0,0,32,'Gemma','Richardson','mrsbmrb@sky.com',7565638650,'DE75 7RS','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1227875662,'19/02/2023','paid','GBP',24,0,0,24,'Claire','Roberts','claireroberts27@hotmail.co.uk',7544781356,'wa2 0hn','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [555444515,'17/02/2023','paid','GBP',32,0,0,32,'Joanna','Rose','joannarose1980@live.co.uk',7557277122,'ng92dx','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1762359457,'17/02/2023','paid','GBP',32,0,0,32,'Sarah','Separovic','sarahseparovic@yahoo.co.uk',7764488766,'Mk197by','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [126362796,'17/02/2023','paid','GBP',24,0,0,24,'Barbara','Sheasby','babs.hudson1988@gmail.com',7715356073,'WS15 1HG','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [210203407,'19/02/2023','paid','GBP',40,0,0,40,'Samantha','Shelton','samantha.shelton@hotmail.co.uk',7779546311,'Sp4 7gh','Alton Towers Resort - Group Waterpark Event 2023',5  ],
      [2106475953,'15/02/2023','paid','GBP',16,0,0,16,'Jennifer','Smith','jennifer_smith_200@hotmail.com',7774198609,'tw4 6hf','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [664560761,'15/02/2023','paid','GBP',24,0,0,24,'Sarah','Snow','sarah.snow@sky.com',7974219696,'ST10 2BQ','Alton Towers Resort - Group Waterpark Event 2023',3  ],
      [1860370559,'15/02/2023','paid','GBP',32,0,0,32,'Emily','Stanton','emily.stanton67@gmail.com',7428107619,'gl114dx','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [327554354,'15/02/2023','paid','GBP',32,0,0,32,'Helen','Stokes','helenlstokes@hotmail.co.uk',7814811571,'LE65 2NT','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1417353958,'17/02/2023','paid','GBP',48,0,0,48,'Angie','Sun','angiesunhk@yahoo.com',7872994074,'b9 4ny','Alton Towers Resort - Group Waterpark Event 2023',6  ],
      [91341143,'15/02/2023','paid','GBP',32,0,0,32,'Melanie','Tang','melgrigg@yahoo.co.uk',7803349909,'DY11 6PR','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [995036403,'15/02/2023','paid','GBP',16,0,0,16,'Lucy','Taperell','lucytaperell@btinternet.com',7702625931,'NG13 0DJ','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [221134051,'15/02/2023','paid','GBP',16,0,0,16,'Sunny','Thaicharoen','thaicharoens@me.com',7549919382,'SW117AE','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [1735780380,'19/02/2023','paid','GBP',32,0,0,32,'Louise','Thomas','louisethomas1981@icloud.com',7724571287,'dy10 4ud','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [1334087048,'17/02/2023','paid','GBP',32,0,0,32,'Amanda','Tonks','mandf2000@yahoo.co.uk',7967078922,'B90 2RN','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [2139991588,'15/02/2023','paid','GBP',16,0,0,16,'Sarah','Tudge','tudgesa@aol.com',7808809261,'wn21ut','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [1658010988,'19/02/2023','paid','GBP',16,0,0,16,'Jake','Woolley','jake.woolley@icloud.com',7896743954,'WS12 0FP','Alton Towers Resort - Group Waterpark Event 2023',2  ],
      [1392383129,'17/02/2023','paid','GBP',8,0,0,8,'Hannah','Wright','h.wright1988@outlook.com',7432225677,'b302ql','Alton Towers Resort - Group Waterpark Event 2023',1  ],
      [302299204,'23/02/2023','paid','GBP',32,0,0,32,'Charlotte','Ashfield','c_v_ashfield@yahoo.co.uk',7966136207,'DY6 0ET','Alton Towers Resort - Group Waterpark Event 2023',4  ],
      [570011012,'01/03/2023','paid','GBP',32,0,0,32,'Paul','Arnold','paul_arnold1@me.com',7740427299,'L23 9UQ','Alton Towers Resort - Group Waterpark Event 2023',4  ]
    ];
    for (const externalSale of externalSalesJSON) {
      sails.log(externalSale[0]);
      const externalOrderID = externalSale[0];
      const externalOrderSource = 'Square';
      const organiser = 'MAPG';
      const purchaserFirstName = externalSale[8];
      const purchaserLastName = externalSale[9];
      const purchaserEmail = externalSale[10];
      const purchaserPhoneNumber = externalSale[11];
      const saleProduct = externalSale[13];
      const saleQTY = externalSale[14];

      const existingImportingOrder = await ImportedTicketSales.findOne({
        externalOrderID,
        externalOrderSource,
        organiser,
      });
      if (existingImportingOrder) {
        continue;
      }
      const existingOrder = await Orders.findOne({
        externalOrderID,
        externalOrderSource,
        organiser,
      });
      if (existingOrder) {
        continue;
      }
      console.log({
        externalOrderID,
        purchaserFirstName,
        purchaserLastName,
        purchaserEmail,
        purchaserPhoneNumber,
        saleProduct,
        saleQTY,
        user: 0,
        externalOrderSource,
        organiser,
        status: 'PENDING',
      });
      await ImportedTicketSales.create({
        externalOrderID,
        purchaserFirstName,
        purchaserLastName,
        purchaserEmail,
        purchaserPhoneNumber,
        saleProduct,
        saleQTY,
        user: 0,
        externalOrderSource,
        organiser,
        status: 'PENDING',
      });
    }

  }


};

