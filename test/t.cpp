/*

*/
#include <iostream>
#include <bits/stdc++.h>
using namespace std;

void solver(){
    int n =18210;
    //code    
    for (int i = 0; i < n; i++)
    {
       for (int j = 0; j < n; j++)
       {

       }
        
    }
    
}

int main(int argc, char const *argv[])
{
    clock_t start,end;

    start = clock();
    solver();
    end = clock();
    double time_taken = (double(end-start)/double(CLOCKS_PER_SEC))/1000;
    cout<<"Execution Time : "<<fixed<<time_taken<<setprecision(5);
    cout<<"ms"<<endl;

    return 0;
}