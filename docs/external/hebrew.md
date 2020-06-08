source: http://www.staff.science.uu.nl/~gent0113/hebrew/addfiles/hebrewcal.js

Note on dates: Western dates until 4 October 1582 CE (18 Tishri 5343 AM) are reckoned according to the Julian calendar. Dates after 14 October 1583 CE (19 Tishri 5343 AM) are reckoned according to the Gregorian calendar.
Note that this calendar calculator is based on the current rules of the Hebrew calendar which, according to tradition, were first introduced in the fourth century CE but were not generally followed until after the tenth century CE.

The javascript file contents are stored here, just in case the source goes offline.

```javascript
function gmod(n,m){

// generalized modulo function (n mod m) also valid for negative values of n

  return ((n%m)+m)%m;
}

function fillout(x,m){
  var fill = "";
  if(m==2){
    if(x < 10) fill = "0";
  }
  if(m==3){
    if(x < 100) fill = "0";
    if(x < 10) fill = "00";
  }
  if(m==4){
    if(x < 1000) fill = "0";
    if(x < 100) fill = "00";
    if(x < 10) fill = "000";
  }

  return fill+x;
}

function thisday_en(){

  var mname = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
  var wname = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');

  var today = new Date();
  var year  = today.getFullYear();
  var month = today.getMonth();
  var day   = today.getDate();
  var wday  = today.getDay();
  return day+' '+mname[month]+' '+year+" ["+wname[wday]+"]";
}

function parts2dayp(parts){

// reduces the fractional parts (rega'im) of the day to hours, chelakim and rega'im

  var reg = Math.floor(gmod((parts+0.01),76));
  var ch  = Math.floor(parts/76);   
  var hr  = Math.floor(ch/1080);
  var ch  = gmod(ch,1080);

  if(reg>0)               return fillout(hr,2)+"h "+fillout(ch,4)+"p "+fillout(reg,2)+"r";
  if((reg==0) && (ch>0))  return fillout(hr,2)+"h "+fillout(ch,4)+"p";
  if((reg==0) && (ch==0)) return fillout(hr,2)+"h";
}

function fracday2hrmin(fday){

// reduces the fractional part of the day to hours and minutes

  var hour = 24*fday;
  var hr   = Math.floor(hour);
  var min  = Math.floor(6000*(hour-hr)+0.5);

  if(min==0)                                            return fillout(hr,2)+"h";
  if((min>0) && (gmod(min,10)>0))                       return fillout(hr,2)+"h "+fillout(min/100,2)+"m";
  if((min>0) && (gmod(min,100)==0))                     return fillout(hr,2)+"h "+fillout(min/100,2)+"m";
  if((min>0) && (gmod(min,100)>0) && (gmod(min,10)==0)) return fillout(hr,2)+"h "+fillout(min/100,2)+"0m";
}


function jgoffset(year){

// evaluates the offset between the Julian and the Gregorian calendar

  var c = Math.floor(year/100);

  return c-Math.floor(c/4)-2;
}

function date2mjd(year,month,day,caltype){

// Meeus, Astronomical Algorithms, Chapter 7, modified for mjd's

  var m = month; // January=0, February=1, etc.
  var y = year;

  if(m<2){
    m += 12;
    y -= 1;
  }

  if(caltype==0) var jgc = 0;            // assume Julian calendar
  if(caltype==1) var jgc = jgoffset(y);  // assume Gregorian calendar

  return Math.floor(365.25*(y-1856))+Math.floor(30.6001*(m+2))-jgc-1102+day;
}

function mjd2date(mjd){

// Meeus, Astronomical Algorithms, Chapter 7, modified for mjd's

  var mname = new Array(" January "," February "," March "," April "," May "," June "," July ",
                        " August "," September "," October "," November "," December ");

  var z = Math.floor(mjd); // integer MJD's

  if(mjd<-100840) var a = z; // assume Julian calendar

  if(mjd>=-100840){      // assume Gregorian calendar
    var aa  = Math.floor((z+532784.25)/36524.25);
    var a   = z+1+aa-Math.floor(aa/4);
  }  

  var b   = a+1102;
  var c   = Math.floor((b-122.1)/365.25);
  var d   = Math.floor(365.25*c);
  var e   = Math.floor((b-d)/30.6001);
  var dy  = b-d-Math.floor(30.6001*e); // day of month
  var mon = e-(e<13.5?2:14);           // month number
  var yr  = c+(mon>1.5?1856:1857);     // year    

  return dy+mname[mon]+yr;
}

function setdate(){

// determine the current Hebrew year from the current Gregorian calendar date

  var today = new Date( );

  var year  = today.getFullYear(); // Returns year
  var month = today.getMonth();    // Returns month number (0-11; 0 = January)
  var day   = today.getDate();     // Returns day number (1-31)

  var mjd = date2mjd(year,month,day,1);

  var hyear = year+3760;

  var mjd1 = date2mjd(year,2,pesach(hyear)+jgoffset(year)+163,1);

  if(mjd>mjd1-1) hyear += 1;

  document.yearinput.hyear.value = hyear;

  hebrewyear();
}

function add_1_year(){
  document.yearinput.hyear.value = hyear+1;

  hebrewyear();
}

function add_10_years(){
  document.yearinput.hyear.value = hyear+10;

  hebrewyear();
}

function add_19_years(){
  document.yearinput.hyear.value = hyear+19;

  hebrewyear();
}

function add_28_years(){
  document.yearinput.hyear.value = hyear+28;

  hebrewyear();
}

function add_100_years(){
  document.yearinput.hyear.value = hyear+100;

  hebrewyear();
}

function add_247_years(){
  document.yearinput.hyear.value = hyear+247;

  hebrewyear();
}

function add_1000_years(){
  document.yearinput.hyear.value = hyear+1000;

  hebrewyear();
}

function add_4104_years(){
  document.yearinput.hyear.value = hyear+4104;

  hebrewyear();
}

function subtract_1_year(){
  document.yearinput.hyear.value = hyear-1;

  hebrewyear();
}

function subtract_10_years(){
  document.yearinput.hyear.value = hyear-10;

  hebrewyear();
}

function subtract_19_years(){
  document.yearinput.hyear.value = hyear-19;

  hebrewyear();
}

function subtract_28_years(){
  document.yearinput.hyear.value = hyear-28;

  hebrewyear();
}

function subtract_100_years(){
  document.yearinput.hyear.value = hyear-100;

  hebrewyear();
}

function subtract_247_years(){
  document.yearinput.hyear.value = hyear-247;

  hebrewyear();
}

function subtract_1000_years(){
  document.yearinput.hyear.value = hyear-1000;

  hebrewyear();
}

function subtract_4104_years(){
  document.yearinput.hyear.value = hyear-4104;

  hebrewyear();
}

function pesach(am){

// Julian date of Pesach (15 Nisan) of the Jewish year 'am' is 'p' March
// New Year (1 Tishri) of the Jewish year 'am+1' is always 163 days later
// Based on the algorithm of C.F. Gauss

  a = gmod(12*am+17,19);
  b = gmod(am,4);
  n = ((5*(3156215-313*am)+a*765433)/492480)+b/4;
  n1 = Math.floor(n);
  n2 = n-n1;
  c = gmod(n1+3*am+5*b+5,7);
  p = n1;
  if((c==2) || (c==4) || (c==6)) p=n1+1;
  if((c==1) && (a>6) && (2160*n2>1366)) p=n1+2;
  if((c==0) && (a>11) && (25920*n2>23268)) p=n1+1;
  return p;
}

function hebrewdate(offset){

  var mname1 = new Array("Tishri","Ḥeshvan","Kislev","Tevet","Shevat","Adar","Nisan","Iyyar","Sivan","Tammuz","Av","Elul");
  var mname2 = new Array("Tishri","Ḥeshvan","Kislev","Tevet","Shevat","Adar I","Adar II","Nisan","Iyyar","Sivan","Tammuz","Av","Elul");
  var wname  = new Array("Yom Rishon","Yom Sheni","Yom Shlishi","Yom Revi'i","Yom Ḥamishi","Yom Shishi","Yom Shabbat");

  var y353 = new Array("0","30","59","88","117","147","176","206","235","265","294","324");
  var y354 = new Array("0","30","59","89","118","148","177","207","236","266","295","325");
  var y355 = new Array("0","30","60","90","119","149","178","208","237","267","296","326");
  var y383 = new Array("0","30","59","88","117","147","177","206","236","265","295","324","354");
  var y384 = new Array("0","30","59","89","118","148","178","207","237","266","296","325","355");
  var y385 = new Array("0","30","60","90","119","149","179","208","238","267","297","326","356");

  var today = new Date( );

  var year  = today.getFullYear(); // Returns year
  var month = today.getMonth();    // Returns month number (0-11; 0 = January)
  var day   = today.getDate();     // Returns day number (1-31)

  var mjd = date2mjd(year,month,day+offset,1);

  var wday = gmod(mjd+3,7);

  var am = year+3760;

  var mjd0 = date2mjd(year-1,2,pesach(am-1)+jgoffset(year-1)+163,1);
  var mjd1 = date2mjd(year,2,pesach(am)+jgoffset(year)+163,1);
  var mjd2 = date2mjd(year+1,2,pesach(am+1)+jgoffset(year+1)+163,1);

  if(mjd<mjd1){
    var ylength = mjd1-mjd0;
  }

  if(mjd>mjd1-1){
    ylength = mjd2-mjd1;
    am = am+1;
    mjd0 = mjd1;
  }

  var dd = mjd-mjd0;

  if(ylength==353){
    for(i=0;i<12;i++){
      if(y353[i]>dd) break;
    }
    month = i-1;
    day = dd-y353[i-1]+1;
  }

  if(ylength==354){
    for(i=0;i<12;i++){
      if(y354[i]>dd) break;
    }
    month=i-1;
    day=dd-y354[i-1]+1;
  }

  if(ylength==355){
    for(i=0;i<12;i++){
      if(y355[i]>dd) break;
    }  
    month=i-1;
    day=dd-y355[i-1]+1;
  }

  if(ylength==383){
    for(i=0;i<13;i++){
      if(y383[i]>dd) break;
    }
    month=i-1;
    day=dd-y383[i-1]+1;
  }  

  if(ylength==384){
    for(i=0;i<13;i++){
      if(y384[i]>dd) break;
    }
    month=i-1;
    day=dd-y384[i-1]+1;
  }  

  if(ylength==385){
    for(i=0;i<13;i++){
      if(y385[i]>dd) break;
    }
    month=i-1;
    day=dd-y385[i-1]+1;
  }

  if(ylength==353 || ylength==354 || ylength==355) return day+" "+mname1[month]+" "+am+" AM ["+wname[wday]+"]";
  if(ylength==383 || ylength==384 || ylength==385) return day+" "+mname2[month]+" "+am+" AM ["+wname[wday]+"]";
}

function hebrewyear(){

  hyear = parseFloat(document.yearinput.hyear.value);

  week   = Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
  mjname = Array(" Tishri"," Ḥeshvan"," Kislev"," Tevet"," Shevat"," Adar"," Nisan",
                 " Iyyar"," Sivan"," Tammuz"," Av"," Elul"," Adar I"," Adar II");
  e1 =   2;
  e2 =   5;
  e3 = 204;

  m1 =   2;
  m2 =  16;
  m3 = 595;

  p1 =   1;
  p2 =  12;
  p3 = 793;

  gyear1 = hyear-3761;
  gyear2 = gyear1+1;

  document.yearinput.gyear.value = String(gyear1)+"/"+String(gyear2);

// determine year in alternate eras used in the past

  hyearc = hyear-3449; // Era of Contracts
  hyeard = hyear-3829; // Era of Destruction of the Temple

  document.yearinput.hyearc.value = hyearc;
  document.yearinput.hyeard.value = hyeard;

// determine year in the 49-year sabbatical/jubilee cycle (Abraham ibn Ezra)

  sabyears = gmod((hyear-1),49);
  sabcycle = Math.floor(sabyears/7);
  sabyear  = sabyears-7*sabcycle;

  if(sabyears>0) document.yearinput.sabbatyear1.value = (sabcycle+1)+" : "+(sabyear+1)+" ["+(sabyears+1)+"]";
  if(sabyears==0) document.yearinput.sabbatyear1.value = "jubilee [1]";

// determine year in the 50-year sabbatical/jubilee cycle (Maimonides)

  sabyears = gmod((hyear-16),50);
  sabcycle = Math.floor(sabyears/7);
  sabyear  = sabyears-7*sabcycle;

  if(sabyears<49) document.yearinput.sabbatyear2.value = (sabcycle+1)+" : "+(sabyear+1)+" ["+(sabyears+1)+"]";
  if(sabyears==49) document.yearinput.sabbatyear2.value = "jubilee [50]";

// determine the year in the 19-year Metonic cycle

  mc0 = Math.floor((hyear-1)/19)+1;
  my0 = hyear-19*(mc0-1);
  a   = gmod(12*my0+5,19);
  py  = Math.floor((235*my0-234)/19);

// determine the year in the 28-year solar cycle

  sc = Math.floor((hyear-1)/28)+1;
  sy = hyear-28*(sc-1);

// determine the molad of the New Year

  s1 = e1+(mc0-1)*m1+py*p1;
  s2 = e2+(mc0-1)*m2+py*p2;
  s3 = e3+(mc0-1)*m3+py*p3;

  k  = Math.floor(s3/1080);
  p0 = s3-k*1080;
  s2 = s2+k;
  k  = Math.floor(s2/24);
  h0 = s2-k*24;
  d0 = gmod(s1+k-1,7);
  w1 = d0;
  sp = 1080*h0+p0;

  document.yearinput.molad0.value = (d0+1)+"d "+fillout(h0,2)+"h "+fillout(p0,4)+"p";

// determine the weekday of the New Year molad

  document.yearinput.weekd1.value = week[w1];

// apply the postponement rules

  q1 = 0;
  q2 = 0;
  q3 = 0;
  q4 = 0;
  q5 = 0;

  if((w1==0) || (w1==3) || (w1==5)) q1 = 1;
  if((q1==0) && (sp>=19440)) q2 = 1;
  if((sp>=19440) && ((w1==2) || (w1==4) || (w1==6))) q3 = 1;
  if((w1==2) && (a>6) && (sp>=9924)) q4 = 1;
  if((w1==1) && (a>11) && (sp>=16789)) q5 = 1;
  if(q4==1) q2 = 0;
  if(q4==1) q3 = 0;
  if((q2==1) && (q5==1)) q5 = 0;

  if((q1+q2+q3+q4+q5)==0) document.yearinput.dehiyyot.value = "no postponement";
  if(q1==1) document.yearinput.dehiyyot.value = "adu";
  if(q2==1) document.yearinput.dehiyyot.value = "molad zaken";
  if(q3==1) document.yearinput.dehiyyot.value = "molad zaken + adu";
  if(q4==1) document.yearinput.dehiyyot.value = "gatarad";
  if(q5==1) document.yearinput.dehiyyot.value = "betu'tekapot";

// determine the number of postponed days  

  pp = q1+q2+q3+2*q4+q5;

  document.yearinput.postp.value = pp;

// determine the weekday of 1 Tishri in the current year

  wdtishri1 = gmod(w1+pp,7);

  document.yearinput.weekd2.value = week[wdtishri1];  

// determine the weekday of 1 Tishri in the following year

  mc1 = Math.floor(hyear/19)+1;
  my1 = hyear+1-19*(mc1-1);
  py = Math.floor((235*my1-234)/19);
  aa = gmod(12*my1+5,19);

  s1 = e1+(mc1-1)*m1+py*p1;
  s2 = e2+(mc1-1)*m2+py*p2;
  s3 = e3+(mc1-1)*m3+py*p3;

  k  = Math.floor(s3/1080);
  p  = s3-k*1080;
  s2 = s2+k;
  k  = Math.floor(s2/24);
  h  = s2-k*24;
  d  = gmod(s1+k-1,7);
  w1 = d;
  sp = 1080*h+p;

  q1 = 0;
  q2 = 0;
  q3 = 0;
  q4 = 0;
  q5 = 0;

  if((w1==0) || (w1==3) || (w1==5)) q1=1;
  if((q1==0) && (sp>=19440)) q2=1;
  if((sp>=19440) && ((w1==2) || (w1==4) || (w1==6))) q3=1;
  if((w1==2) && (aa>6) && (sp>=9924)) q4=1;
  if((w1==1) && (aa>11) && (sp>=16789)) q5=1;
  if(q4==1) q2=0;
  if(q4==1) q3=0;
  if((q2==1) && (q5==1)) q5=0;

  pp = q1+q2+q3+2*q4+q5;
  wdnexttishri1 = gmod(w1+pp,7);

// determine the weekday of 15 Nisan

  wdnisan15 = gmod(wdnexttishri1+5,7);

  document.yearinput.y19.value = mc0+" : "+fillout(my0,2);
  document.yearinput.y28.value = sc+" : "+fillout(sy,2);

// determine the year length

  if(a>6) yearlen = 350+gmod(wdnexttishri1-wdtishri1,7);
  if(a<7) yearlen = 385-gmod(wdtishri1-wdnexttishri1,7);

// determine the kevi'ah

  yt="?";

  if(yearlen==353) yt = "d";
  if(yearlen==354) yt = "r";
  if(yearlen==355) yt = "a";
  if(yearlen==383) yt = "D";
  if(yearlen==384) yt = "R";
  if(yearlen==385) yt = "A";

// determine the year type

  if(a>6) document.yearinput.ytype.value = "common year ("+String(wdtishri1+1)+String(yt)+String(wdnisan15+1)+")";
  if(a<7) document.yearinput.ytype.value = "intercalary year ("+String(wdtishri1+1)+String(yt)+String(wdnisan15+1)+")";

  document.yearinput.yearlength.value = yearlen;

  document.yearinput.weekdnisan15.value = week[wdnisan15];

// determine the molad for each month of the current year

  document.molads.molad1.value = (d0+1)+"d "+fillout(h0,2)+"h "+fillout(p0,4)+"p";

  s1 = d0+p1;
  s2 = h0+p2;
  s3 = p0+p3;

  k  = Math.floor(s3/1080);
  p  = s3-k*1080;
  s2 = s2+k;
  k  = Math.floor(s2/24);
  h  = s2-k*24;
  d  = gmod(s1+k,7);

  document.molads.molad2.value = (d+1)+"d "+fillout(h,2)+"h "+fillout(p,4)+"p";

  s1 = d+p1;
  s2 = h+p2;
  s3 = p+p3;

  k  = Math.floor(s3/1080);
  p  = s3-k*1080;
  s2 = s2+k;
  k  = Math.floor(s2/24);
  h  = s2-k*24;
  d  = gmod(s1+k,7);

  document.molads.molad3.value = (d+1)+"d "+fillout(h,2)+"h "+fillout(p,4)+"p";

  s1 = d+p1;
  s2 = h+p2;
  s3 = p+p3;

  k  = Math.floor(s3/1080);
  p  = s3-k*1080;
  s2 = s2+k;
  k  = Math.floor(s2/24);
  h  = s2-k*24;
  d  = gmod(s1+k,7);

  document.molads.molad4.value = (d+1)+"d "+fillout(h,2)+"h "+fillout(p,4)+"p";

  s1 = d+p1;
  s2 = h+p2;
  s3 = p+p3;

  k  = Math.floor(s3/1080);
  p  = s3-k*1080;
  s2 = s2+k;
  k  = Math.floor(s2/24);
  h  = s2-k*24;
  d  = gmod(s1+k,7);

  document.molads.molad5.value = (d+1)+"d "+fillout(h,2)+"h "+fillout(p,4)+"p";

  s1 = d+p1;
  s2 = h+p2;
  s3 = p+p3;

  k  = Math.floor(s3/1080);
  p  = s3-k*1080;
  s2 = s2+k;
  k  = Math.floor(s2/24);
  h  = s2-k*24;
  d  = gmod(s1+k,7);

  document.molads.adar1.value = " ";
  document.molads.adar2.value = " ";

  document.molads.molad6.value = (d+1)+"d "+fillout(h,2)+"h "+fillout(p,4)+"p";
  document.molads.molad6b.value = " ";

  if(a<7){
    s1=d+p1;
    s2=h+p2;
    s3=p+p3;

    k=Math.floor(s3/1080);
    p=s3-k*1080;
    s2=s2+k;
    k=Math.floor(s2/24);
    h=s2-k*24;
    d=(s1+k)%7;

    document.molads.adar1.value = "I";
    document.molads.adar2.value = "II";

    document.molads.molad6b.value = (d+1)+"d "+fillout(h,2)+"h "+fillout(p,4)+"p";
  }

  s1=d+p1;
  s2=h+p2;
  s3=p+p3;

  k=Math.floor(s3/1080);
  p=s3-k*1080;
  s2=s2+k;
  k=Math.floor(s2/24);
  h=s2-k*24;
  d=(s1+k)%7;

  document.molads.molad7.value = (d+1)+"d "+fillout(h,2)+"h "+fillout(p,4)+"p";

  s1=d+p1;
  s2=h+p2;
  s3=p+p3;

  k=Math.floor(s3/1080);
  p=s3-k*1080;
  s2=s2+k;
  k=Math.floor(s2/24);
  h=s2-k*24;
  d=(s1+k)%7;

  document.molads.molad8.value = (d+1)+"d "+fillout(h,2)+"h "+fillout(p,4)+"p";

  s1=d+p1;
  s2=h+p2;
  s3=p+p3;

  k=Math.floor(s3/1080);
  p=s3-k*1080;
  s2=s2+k;
  k=Math.floor(s2/24);
  h=s2-k*24;
  d=(s1+k)%7;

  document.molads.molad9.value = (d+1)+"d "+fillout(h,2)+"h "+fillout(p,4)+"p";

  s1=d+p1;
  s2=h+p2;
  s3=p+p3;

  k=Math.floor(s3/1080);
  p=s3-k*1080;
  s2=s2+k;
  k=Math.floor(s2/24);
  h=s2-k*24;
  d=(s1+k)%7;

  document.molads.molad10.value = (d+1)+"d "+fillout(h,2)+"h "+fillout(p,4)+"p";

  s1=d+p1;
  s2=h+p2;
  s3=p+p3;

  k=Math.floor(s3/1080);
  p=s3-k*1080;
  s2=s2+k;
  k=Math.floor(s2/24);
  h=s2-k*24;
  d=(s1+k)%7;

  document.molads.molad11.value = (d+1)+"d "+fillout(h,2)+"h "+fillout(p,4)+"p";

  s1=d+p1;
  s2=h+p2;
  s3=p+p3;

  k=Math.floor(s3/1080);
  p=s3-k*1080;
  s2=s2+k;
  k=Math.floor(s2/24);
  h=s2-k*24;
  d=(s1+k)%7;

  document.molads.molad12.value = (d+1)+"d "+fillout(h,2)+"h "+fillout(p,4)+"p";

  s1=d+p1;
  s2=h+p2;
  s3=p+p3;

  k=Math.floor(s3/1080);
  p=s3-k*1080;
  s2=s2+k;
  k=Math.floor(s2/24);
  h=s2-k*24;
  d=gmod(s1+k,7);

  document.molads.molad13.value = (d+1)+"d "+fillout(h,2)+"h "+fillout(p,4)+"p";

// determine the dates of the principal Jewish holy days

// 15 Nisan (previous year)

  a = gmod(12*(hyear-1)+17,19);
  b = gmod((hyear-1),4);
  s = (3156215-313*(hyear-1))/98496+(765433*a)/492480+b/4;
  q = Math.floor(s);
  r = s-q;
  c = gmod(q+3*(hyear-1)+5*b+5,7);
  dmh = q;
  p = 0;

  if((c==2) || (c==4) || (c==6)) p = 1;            // because of Adu
  if((c==1) && (a>6) && (r>=1367/2160)) p = 2;     // because of Gatarad
  if((c==0) && (a>11) && (r>=23269/25920)) p = 1;  // because of Batu Thakpad

  dtishri1 = dmh+p+132; // date of 1 Tishri in days since 0 March (Julian reckoning)

  mjd = date2mjd(gyear1,3,dtishri1,0);

  mjdtishri1 = mjd;

  document.yearcalendar.wtishri1.value = week[wdtishri1];
  document.yearcalendar.dtishri1.value = mjd2date(mjd);

  dtishri2 = dtishri1+1; // 2 Tishri

  mjd = date2mjd(gyear1,3,dtishri2,0);

  document.yearcalendar.wtishri2.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dtishri2.value = mjd2date(mjd);

  dtg = 0;

  if(wdtishri1==4) dtg = 1; // when 1 Tishri is a Wednesday, advance by one day

  dtishri3 = dtishri1+2+dtg; // 3/4 Tishri

  mjd = date2mjd(gyear1,3,dtishri3,0);

  document.yearcalendar.cdtishri3.value = 3+dtg;
  document.yearcalendar.wtishri3.value  = week[gmod(mjd+3,7)];
  document.yearcalendar.dtishri3.value  = mjd2date(mjd);

  dtishri10 = dtishri1+9; // 10 Tishri

  mjd = date2mjd(gyear1,3,dtishri10,0);

  document.yearcalendar.wtishri10.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dtishri10.value = mjd2date(mjd);

  dtishri15 = dtishri1+14; // 15 Tishri

  mjd = date2mjd(gyear1,3,dtishri15,0);

  document.yearcalendar.wtishri15.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dtishri15.value = mjd2date(mjd);

  dtishri17 = dtishri1+16; // 17 Tishri

  mjd = date2mjd(gyear1,3,dtishri17,0);

  document.yearcalendar.wtishri17.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dtishri17.value = mjd2date(mjd);

  dtishri20 = dtishri1+19; // 20 Tishri

  mjd = date2mjd(gyear1,3,dtishri20,0);

  document.yearcalendar.wtishri20.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dtishri20.value = mjd2date(mjd);

  dtishri21 = dtishri1+20; // 21 Tishri

  mjd = date2mjd(gyear1,3,dtishri21,0);

  document.yearcalendar.wtishri21.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dtishri21.value = mjd2date(mjd);

  dtishri22 = dtishri1+21; // 22 Tishri

  mjd = date2mjd(gyear1,3,dtishri22,0);

  document.yearcalendar.wtishri22.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dtishri22.value = mjd2date(mjd);

  dtishri23 = dtishri1+22; // 23 Tishri

  mjd = date2mjd(gyear1,3,dtishri23,0);

  document.yearcalendar.wtishri23.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dtishri23.value = mjd2date(mjd);

  add1 = 0;
  add2 = 0;

  if((yt=="a") || (yt=="A")) add1 = 1;
  if((yt=="d") || (yt=="D")) add2 = -1;

  dkislev25 = dtishri1+83+add1; // 25 Kislev

  mjd = date2mjd(gyear1,3,dkislev25,0);

  document.yearcalendar.wkislev25.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dkislev25.value = mjd2date(mjd);

  dtevet2 = dtishri1+90+add1; // 2/3 Tevet

  mjd = date2mjd(gyear1,3,dtevet2,0);

  document.yearcalendar.cdtevet2.value = 2-add2;
  document.yearcalendar.wtevet2.value  = week[gmod(mjd+3,7)];
  document.yearcalendar.dtevet2.value  = mjd2date(mjd);

  dtevet10 = dtishri1+98+add1+add2; // 10 Tevet

  mjd = date2mjd(gyear1,3,dtevet10,0);

  mjdtevet1 = mjd-9;

  document.yearcalendar.wtevet10.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dtevet10.value = mjd2date(mjd);

  dshevat15 = dtishri1+132+add1+add2; // 15 Shevat

  mjd = date2mjd(gyear1,3,dshevat15,0);

  document.yearcalendar.wshevat15.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dshevat15.value = mjd2date(mjd);

// 15 Nisan (current year)

  a = gmod(12*hyear+17,19);
  b = gmod(hyear,4);
  s = (3156215-313*hyear)/98496+(765433*a)/492480+b/4;
  q = Math.floor(s);
  r = s-q;
  c = gmod(q+3*hyear+5*b+5,7);
  dmh = q;
  p = 0;

  if((c==2) || (c==4) || (c==6)) p = 1;            // because of Adu
  if((c==1) && (a>6) && (r>=1367/2160)) p = 2;     // because of Gatarad
  if((c==0) && (a>11) && (r>=23269/25920)) p = 1;  // because of Batu Thakpad

  dpesach = dmh+p-31; // date of 15 Nisan in March (Julian reckoning)

  adar = "  ";
  if((yt=="D") || (yt=="R") || (yt=="A")) adar = "II";

  document.yearcalendar.madar1.value = String(adar);
  document.yearcalendar.madar2.value = String(adar);
  document.yearcalendar.madar3.value = String(adar);

  dfesther = 0;
  if(wdnisan15==2) dfesther = -2;

  dadar13 = dpesach-31+dfesther; // 11/13 Adar

  mjd = date2mjd(gyear2,3,dadar13,0);

  document.yearcalendar.cdadar13.value = 13+dfesther;
  document.yearcalendar.wadar13.value  = week[gmod(mjd+3,7)];
  document.yearcalendar.dadar13.value  = mjd2date(mjd);

  dadar14 = dpesach-30; // 14 Adar
  mjd=date2mjd(gyear2,3,dadar14,0);

  document.yearcalendar.wadar14.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dadar14.value = mjd2date(mjd);

  dadar15 = dpesach-29; // 15 Adar
  mjd = date2mjd(gyear2,3,dadar15,0);

  document.yearcalendar.wadar15.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dadar15.value = mjd2date(mjd);

  dffb = 0;
  if(wdnisan15==0) dffb = -2;

  dfastfb = dpesach-(1-dffb); // 12/14 Nisan

  mjd = date2mjd(gyear2,3,dfastfb,0);

  document.yearcalendar.cdnisan14.value = 14+dffb;
  document.yearcalendar.wnisan14.value  = week[gmod(mjd+3,7)];
  document.yearcalendar.dnisan14.value  = mjd2date(mjd);

  mjd = date2mjd(gyear2,3,dpesach,0); // 15 Nisan

  mjdnisan1 = mjd-14;

  blessingsun    = 1+gmod(3-wdnisan15,7)+" Nisan";
  mjdblessingsun = mjdnisan1+gmod(3-wdnisan15,7);

  document.yearcalendar.wnisan15.value = week[wdnisan15];
  document.yearcalendar.dnisan15.value = mjd2date(mjd);

  domer1 = dpesach+1; // 16 Nisan

  mjd = date2mjd(gyear2,3,domer1,0);

  document.yearcalendar.wnisan16.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dnisan16.value = mjd2date(mjd);

  dpesach3 = dpesach+2; // 17 Nisan

  mjd = date2mjd(gyear2,3,dpesach3,0);

  document.yearcalendar.wnisan17.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dnisan17.value = mjd2date(mjd);

  dpesach6 = dpesach+5;  // 20 Nisan

  mjd = date2mjd(gyear2,3,dpesach6,0);

  document.yearcalendar.wnisan20.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dnisan20.value = mjd2date(mjd);

  dpesach8 = dpesach+7; // 21 Nisan

  mjd = date2mjd(gyear2,3,dpesach8,0);

  document.yearcalendar.wnisan22.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dnisan22.value = mjd2date(mjd);

  domer33 = dpesach+33; // 18 iyyar

  mjd = date2mjd(gyear2,3,domer33,0);

  document.yearcalendar.wiyyar18.value = week[gmod(mjd+3,7)];
  document.yearcalendar.diyyar18.value = mjd2date(mjd);

  domer50 = dpesach+50; // 6 Sivan

  mjd = date2mjd(gyear2,3,domer50,0);

  document.yearcalendar.wsivan6.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dsivan6.value = mjd2date(mjd);

  domer51 = dpesach+51; // 7 Sivan

  mjd = date2mjd(gyear2,3,domer51,0);

  mjdtammuz1 = mjd+24;

  document.yearcalendar.wsivan7.value = week[gmod(mjd+3,7)];
  document.yearcalendar.dsivan7.value = mjd2date(mjd);

  dftam = 0;
  if(wdnisan15==6) dftam = 1;

  domer91 = dpesach+91+dftam; // 17/18 Tammuz

  mjd = date2mjd(gyear2,3,domer91,0);

  document.yearcalendar.cdtammuz17.value = 17+dftam;
  document.yearcalendar.wtammuz17.value  = week[gmod(mjd+3,7)];
  document.yearcalendar.dtammuz17.value  = mjd2date(mjd);

  dfav = 0;
  if(wdnisan15==6) dfav = 1;

  domer112 = dpesach+112+dfav; // 9/10 Av

  mjd = date2mjd(gyear2,3,domer112,0);

  document.yearcalendar.cdav9.value = 9+dfav;
  document.yearcalendar.wav9.value  = week[gmod(mjd+3,7)];
  document.yearcalendar.dav9.value  = mjd2date(mjd);

// determine the tekufot according to rabbi Shemuel Yarhinai (based on a solar year of 365.25 days)

  solaryear = 719513280/1969920; // expressed in rega'im

  mjd = solaryear*(hyear-1.75)-2051833;

// mjd of the autumn equinox   

  mjd = mjd+solaryear/4;

  f = mjd-Math.floor(mjd);

  tqftishri = 1+Math.floor(mjd-mjdtishri1); // days since 0 Tishri

  if(tqftishri<1)                   tqftishri = (tqftishri+29)+mjname[11]; // occurs in Elul (previous year)
  if(tqftishri>=1 && tqftishri<=30) tqftishri = tqftishri+mjname[0];       // occurs in Tishri
  if(tqftishri>30)                  tqftishri = (tqftishri-30)+mjname[1];  // occurs in H.eshvan

  document.tekufot.jtekufot1a.value    = tqftishri;
  document.tekufot.hchrtekufot1a.value = parts2dayp(1969920*f);

  f = (mjd-0.25)-Math.floor(mjd-0.25);

  document.tekufot.dtekufot1a.value  = mjd2date(mjd-0.25);
  document.tekufot.hmtekufot1a.value = fracday2hrmin(f);

  mjdrainprayer = mjd+59;

// mjd of the winter equinox   

  mjd = mjd+solaryear/4;

  f = mjd-Math.floor(mjd);

  tqftevet = 1+Math.floor(mjd-mjdtevet1); // days since 0 Tevet

  if(tqftevet<1)                  tqftevet = (tqftevet+30+add2)+mjname[2]; // occurs in Kislev
  if(tqftevet>=1 && tqftevet<=29) tqftevet = tqftevet+mjname[3];           // occurs in Tevet
  if(tqftevet>29)                 tqftevet = (tqftevet-29)+mjname[4];      // occurs in Shevat

  document.tekufot.jtekufot1b.value    = tqftevet;
  document.tekufot.hchrtekufot1b.value = parts2dayp(1969920*f);

  f = (mjd-0.25)-Math.floor(mjd-0.25);

  document.tekufot.dtekufot1b.value  = mjd2date(mjd-0.25);
  document.tekufot.hmtekufot1b.value = fracday2hrmin(f);

// mjd of the spring equinox   

  mjd = mjd+solaryear/4;

  f = mjd-Math.floor(mjd);

  tqfnisan = 1+Math.floor(mjd-mjdnisan1); // days since 0 Nisan

  if(tqfnisan<1 && adar=="  ")    tqfnisan = (tqfnisan+29)+mjname[5];  // occurs in Adar
  if(tqfnisan<1 && adar=="II")    tqfnisan = (tqfnisan+29)+mjname[13]; // occurs in Adar II
  if(tqfnisan>=1 && tqfnisan<=30) tqfnisan = tqfnisan+mjname[6];       // occurs in Nisan
  if(tqfnisan>30)                 tqfnisan = (tqfnisan-30)+mjname[7];  // occurs in iyyar

  document.tekufot.jtekufot1c.value    = tqfnisan;
  document.tekufot.hchrtekufot1c.value = parts2dayp(1969920*f);

  f = (mjd-0.25)-Math.floor(mjd-0.25);

  document.tekufot.dtekufot1c.value  = mjd2date(mjd-0.25);
  document.tekufot.hmtekufot1c.value = fracday2hrmin(f);

//  mjdblessingsun = mjd;

// mjd of the summer equinox   

  mjd = mjd+solaryear/4;

  f = mjd-Math.floor(mjd);

  tqftammuz = 1+Math.floor(mjd-mjdtammuz1); // days since 0 Tammuz

  if(tqftammuz<1)                   tqftammuz = (tqftammuz+30)+mjname[8];  // occurs in Sivan
  if(tqftammuz>=1 && tqftammuz<=29) tqftammuz = tqftammuz+mjname[9];       // occurs in Tammuz
  if(tqftammuz>29)                  tqftammuz = (tqftammuz-29)+mjname[10]; // occurs in Av

  document.tekufot.jtekufot1d.value    = tqftammuz;
  document.tekufot.hchrtekufot1d.value = parts2dayp(1969920*f);

  f = (mjd-0.25)-Math.floor(mjd-0.25);

  document.tekufot.dtekufot1d.value  = mjd2date(mjd-0.25);
  document.tekufot.hmtekufot1d.value = fracday2hrmin(f);

  rainprayer = 1+Math.floor(mjdrainprayer-mjdtishri1);

  if(rainprayer>30 && rainprayer<=59+add1)               rainprayer = (rainprayer-30)+mjname[1];             // occurs in H.eshvan
  if(rainprayer>(59+add1) && rainprayer<=(89+add1+add2)) rainprayer = (rainprayer-(59+add1))+mjname[2];      // occurs in Kislev
  if(rainprayer>(89+add1+add2))                          rainprayer = (rainprayer-(89+add1+add2))+mjname[3]; // occurs in Tevet

  document.tekufot.jrainprayer1.value = rainprayer;
  document.tekufot.drainprayer1.value = mjd2date(mjdrainprayer);

  document.tekufot.jblessingsun1.value = " ";
  document.tekufot.dblessingsun1.value = " ";

  if(gmod(hyear,28)==1){
    document.tekufot.jblessingsun1.value = blessingsun;
    document.tekufot.dblessingsun1.value = mjd2date(mjdblessingsun);
  }

// determine the tekufot according to rabbi ’Ada bar Ahabah (based on a solar year of (235/19)*(29+(12+793/1080)/24))

  solaryear = 719507020/1969920; // expressed in rega'im

  mjdtqfnisan1 = 2051826; // mjd of tekufot Nisan 1 AM

  mjd = solaryear*(hyear-1.75)-mjdtqfnisan1;

// mjd of the autumn equinox   

  mjd = mjd+solaryear/4;

  f = mjd-Math.floor(mjd);

  tqftishri = 1+Math.floor(mjd-mjdtishri1); // days since 0 Tishri

  if(tqftishri<1)                   tqftishri = (tqftishri+29)+mjname[11];  // occurs in Elul (previous year)
  if(tqftishri>=1 && tqftishri<=30) tqftishri = tqftishri+mjname[0];        // occurs in Tishri
  if(tqftishri>30)                  tqftishri = (tqftishri-30)+mjname[1];   // occurs in H.eshvan

  document.tekufot.jtekufot2a.value    = tqftishri;
  document.tekufot.hchrtekufot2a.value = parts2dayp(1969920*f);

  f = (mjd-0.25)-Math.floor(mjd-0.25);

  document.tekufot.dtekufot2a.value  = mjd2date(mjd-0.25);
  document.tekufot.hmtekufot2a.value = fracday2hrmin(f);

  mjdrainprayer = mjd+59;

// mjd of the winter equinox   

  mjd = mjd+solaryear/4;

  f = mjd-Math.floor(mjd);

  tqftevet = 1+Math.floor(mjd-mjdtevet1); // days since 0 Tevet

  if(tqftevet<1)                  tqftevet = (tqftevet+30+add2)+mjname[2]; // occurs in Kislev
  if(tqftevet>=1 && tqftevet<=29) tqftevet = tqftevet+mjname[3];           // occurs in Tevet
  if(tqftevet>29)                 tqftevet = (tqftevet-29)+mjname[4];      // occurs in Shevat

  document.tekufot.jtekufot2b.value    = tqftevet;
  document.tekufot.hchrtekufot2b.value = parts2dayp(1969920*f);

  f = (mjd-0.25)-Math.floor(mjd-0.25);

  document.tekufot.dtekufot2b.value  = mjd2date(mjd-0.25);
  document.tekufot.hmtekufot2b.value = fracday2hrmin(f);

// mjd of the spring equinox   

  mjd = mjd+solaryear/4;

  f = mjd-Math.floor(mjd);

  tqfnisan = 1+Math.floor(mjd-mjdnisan1); // days since 0 Nisan

  if(tqfnisan<1 && adar=="  ")    tqfnisan = (tqfnisan+29)+mjname[5];  // occurs in Adar
  if(tqfnisan<1 && adar=="II")    tqfnisan = (tqfnisan+29)+mjname[13]; // occurs in Adar II
  if(tqfnisan>=1 && tqfnisan<=30) tqfnisan = tqfnisan+mjname[6];       // occurs in Nisan
  if(tqfnisan>30)                 tqfnisan = (tqfnisan-30)+mjname[7];  // occurs in iyyar

  document.tekufot.jtekufot2c.value    = tqfnisan;
  document.tekufot.hchrtekufot2c.value = parts2dayp(1969920*f);

  f = (mjd-0.25)-Math.floor(mjd-0.25);

  document.tekufot.dtekufot2c.value  = mjd2date(mjd-0.25);
  document.tekufot.hmtekufot2c.value = fracday2hrmin(f);

//  mjdblessingsun = mjd;

// mjd of the summer equinox   

  mjd = mjd+solaryear/4;

  f = mjd-Math.floor(mjd);

  tqftammuz = 1+Math.floor(mjd-mjdtammuz1); // days since 0 Tammuz

  if(tqftammuz<1)                   tqftammuz = (tqftammuz+30)+mjname[8];  // occurs in Sivan
  if(tqftammuz>=1 && tqftammuz<=29) tqftammuz = tqftammuz+mjname[9];       // occurs in Tammuz
  if(tqftammuz>29)                  tqftammuz = (tqftammuz-29)+mjname[10]; // occurs in Av

  document.tekufot.jtekufot2d.value    = tqftammuz;
  document.tekufot.hchrtekufot2d.value = parts2dayp(1969920*f);

  f = (mjd-0.25)-Math.floor(mjd-0.25);

  document.tekufot.dtekufot2d.value  = mjd2date(mjd-0.25);
  document.tekufot.hmtekufot2d.value = fracday2hrmin(f);

  rainprayer = 1+Math.floor(mjdrainprayer-mjdtishri1); // days since 0 Tishri

  if(rainprayer>30 && rainprayer<=59+add1)               rainprayer = (rainprayer-30)+mjname[1];             // occurs in H.eshvan
  if(rainprayer>(59+add1) && rainprayer<=(89+add1+add2)) rainprayer = (rainprayer-(59+add1))+mjname[2];      // occurs in Kislev
  if(rainprayer>(89+add1+add2))                          rainprayer = (rainprayer-(89+add1+add2))+mjname[3]; // occurs in Tevet

  document.tekufot.jrainprayer2.value = rainprayer;
  document.tekufot.drainprayer2.value = mjd2date(mjdrainprayer);

  document.tekufot.jblessingsun2.value = " ";
  document.tekufot.dblessingsun2.value = " ";

  if(gmod(hyear,28)==1){
    document.tekufot.jblessingsun2.value = blessingsun;
    document.tekufot.dblessingsun2.value = mjd2date(mjdblessingsun);
  }
}
```
