from numpy import *
from matplotlib import pyplot as plt

fn= "../data/data_provinces.csv"


name,region=loadtxt(fn, unpack=True,delimiter=',',skiprows=1,dtype='a',usecols=arange(2))
population,lifeExpectancy,incomePerCapita,expenditurePerCapita=loadtxt(fn, unpack=True,delimiter=',',skiprows=1,usecols=arange(4)+(2))

region_list = unique(region)
nregion=len(region_list)

fac=1e-6
pop_list=zeros(nregion)

for i in arange(nregion):
    pop_list[i]=sum(population[region==region_list[i]])*fac
    
isort=argsort(pop_list)[::-1]
    

ypos=arange(nregion)

plt.clf()
plt.barh(ypos,pop_list[isort][::-1], align='center')
plt.yticks(ypos, region_list[isort][::-1])
plt.ylim((-1,17))
plt.xlim((0,13))
plt.xlabel("Total Population (in millions)")
plt.title("PH regions Ranked by Population")
plt.show()