from numpy import *
from matplotlib import pyplot as plt

fn= "../data/data_provinces.csv"


name,region=loadtxt(fn, unpack=True,delimiter=',',skiprows=1,dtype='a',usecols=arange(2))
population,lifeExpectancy,incomePerCapita,expenditurePerCapita=loadtxt(fn, unpack=True,delimiter=',',skiprows=1,usecols=arange(4)+(2))

region_list = unique(region)

x = population*1e-9


popA=population[region=='Region XII']

list = []

r = {}

region_list=unique(region)

for i in region_list:
    av = {}
    q=sum(population[region==i])
    av['region']=i
    av['population']=q
    list.append(av)

    

ypos = arange(len(region_list))
plt.barh(ypos, a, align='center')
plt.yticks(ypos, region_list)


plt.xlabel("Total Population (in millions)")
plt.show()