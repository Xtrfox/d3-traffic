from numpy import *
import os

fnlist = os.listdir("/data")
nfiles=len(fnlist)
year=zeros(nfiles)

for i in arange(nfiles):
    fn="../data/"+fnlist[i]
    lineID, stationID=loadtxt(fn, unpack=True,usecols=arange(1))
    statusN, statusS

    year[i]=int(fnlist[0].splut('_')[1][0:4])
    
fn_out
fn="../data/output_%

for j in arange(len(lineID)):
    fp.write("%d, %d % (year[i],linename[j]