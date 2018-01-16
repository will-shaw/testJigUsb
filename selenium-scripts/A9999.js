
function fillA9999(portName, testKey, callbackA9999) {
    require('chromedriver');
    const { Builder, By, Key, until } = require('selenium-webdriver');    
    const testRunner = require('../src/TestJigRunner');
    let driver = new Builder().forBrowser('chrome').build();
    driver.manage().window().maximize();

    const rootXpath = '//*[@id=\"main-content\"]/div[5]/div/div[1]/div/div/table/tbody';       
    
    driver.get('https://confluence.syft.com:8443/display/BUILDS/Universal+Test+Jig+A9999+High+Mass+Ion+Guide');

    driver.wait(until.elementLocated(By.xpath("//*[@id=\"os_username\"]")), 30000, 'Could not locate input field for username').then(function () {
        driver.findElement(By.xpath("//*[@id=\"os_username\"]")).sendKeys("thales.priolli");
    }).catch(function(){
        console.log('Could not locate input field for username');
    });

    driver.wait(until.elementLocated(By.xpath("//*[@id=\"os_password\"]")), 30000).then(function () {
        driver.findElement(By.xpath("//*[@id=\"os_password\"]")).sendKeys("0224581746");
    }).catch(function(){
        console.log('Could not locate input field for password');
    });

    
        
    driver.wait(until.elementLocated(By.xpath(rootXpath)), 30000).then(function () {
        driver.executeScript('alert(\"Hang on a few seconds while the test is being executed!!\");');
        setTimeout(function() {  }, 5000);

        testRunner.runTest(portName, testKey, callbackRunTest);            
        
        function callbackRunTest(result) {                    
            //Supply 48V                   
            driver.findElement(By.xpath(rootXpath + '/tr[3]/td[2]/div/div/div/div[1]/div[1]/input')).clear();                             
            driver.findElement(By.xpath(rootXpath + '/tr[3]/td[2]/div/div/div/div[1]/div[1]/input')).sendKeys(result.Supply);
            driver.findElement(By.xpath(rootXpath + '/tr[3]/td[2]/div/div/div/div[1]/label')).click();                            
            driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[3]/td[2]/div/div/div/div[1]/div[2]/button')), 2000).then(function(){
                driver.findElement(By.xpath(rootXpath + '/tr[3]/td[2]/div/div/div/div[1]/div[2]/button')).click();
            }).catch(function(){
                console.log('Could not locate submit button for Supply Voltage test');
            });                                                                  

            //LED1
            if(result.LED1 == 'OK') {
                driver.findElement(By.xpath(rootXpath + "/tr[4]/td[2]/div/div/div/div/div[1]/button[1]")).click();
                driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[4]/td[2]/div/div/div/div[1]/div[2]/button')), 2000).then(function(){
                    driver.findElement(By.xpath(rootXpath + '/tr[4]/td[2]/div/div/div/div[1]/div[2]/button')).click();
                }).catch(function(){
                    console.log('Could not locate submit button for LED 1 test');
                }); 
                //LED2
                if(result.LED2 == 'OK'){
                    driver.findElement(By.xpath(rootXpath + "/tr[5]/td[2]/div/div/div/div/div[1]/button[1]")).click();
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[5]/td[2]/div/div/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[5]/td[2]/div/div/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for LED 2 test');
                    }); 
                    
                    //Setpoint 0   
                    driver.findElement(By.xpath(rootXpath + '/tr[6]/td[2]/div/div[1]/div/div[1]/div[1]/input')).clear();                                     
                    driver.findElement(By.xpath(rootXpath + "/tr[6]/td[2]/div/div[1]/div/div[1]/div[1]/input")).sendKeys(result.Feedback0);                                        
                    driver.findElement(By.xpath(rootXpath + '/tr[6]/td[2]/div/div[1]/div/div[1]/label')).click();                                                      
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[6]/td[2]/div/div/div/div[1]/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[6]/td[2]/div/div/div/div[1]/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Feedback0 Voltage test');
                    }); 
                    driver.findElement(By.xpath(rootXpath + '/tr[6]/td[2]/div/div[2]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + '/tr[6]/td[2]/div/div[2]/div/div/div[1]/input')).sendKeys(result.Load0);                    
                    driver.findElement(By.xpath(rootXpath + '/tr[6]/td[2]/div/div[2]/div/div/label')).click();                                      
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[6]/td[2]/div/div[2]/div/div[1]/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[6]/td[2]/div/div[2]/div/div[1]/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load0 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[6]/td[2]/div/div[3]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + "/tr[6]/td[2]/div/div[3]/div/div/div[1]/input")).sendKeys(result.Load0_min);                    
                    driver.findElement(By.xpath(rootXpath + '/tr[6]/td[2]/div/div[3]/div/div[1]/label')).click();                                                     
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[6]/td[2]/div/div[3]/div/div[1]/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[6]/td[2]/div/div[3]/div/div[1]/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load0_min Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[6]/td[2]/div/div[4]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + "/tr[6]/td[2]/div/div[4]/div/div/div[1]/input")).sendKeys(result.Load0_max);
                    driver.findElement(By.xpath(rootXpath + '/tr[6]/td[2]/div/div[4]/div/div[1]/label')).click();                                        
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[6]/td[2]/div/div[4]/div/div[1]/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[6]/td[2]/div/div[4]/div/div[1]/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load0_max Voltage test');
                    });

                    //Setpoint 1
                    driver.findElement(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[1]/div/div[1]/div[1]/input')).clear();            
                    driver.findElement(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[1]/div/div[1]/div[1]/input')).sendKeys(result.Feedback1);
                    driver.findElement(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[1]/div/div[1]/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[1]/div/div[1]/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[1]/div/div[1]/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Feedback1 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[2]/div/div/div[1]/input')).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[7]/td[2]/div/div[2]/div/div/div[1]/input")).sendKeys(result.Load1);
                    driver.findElement(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[2]/div/div[1]/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[2]/div/div[1]/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[2]/div/div[1]/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load1 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[3]/div/div/div[1]/input')).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[7]/td[2]/div/div[3]/div/div/div[1]/input")).sendKeys(result.Load1_min);
                    driver.findElement(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[3]/div/div[1]/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[3]/div/div[1]/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[3]/div/div[1]/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load1_min Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[4]/div/div/div[1]/input')).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[7]/td[2]/div/div[4]/div/div/div[1]/input")).sendKeys(result.Load1_max);
                    driver.findElement(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[4]/div/div[1]/label')).click();                                        
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[4]/div/div[1]/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[7]/td[2]/div/div[4]/div/div[1]/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load1_min Voltage test');
                    });
                    
                    //Setpoint 2
                    driver.findElement(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[1]/div/div[1]/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[1]/div/div[1]/div[1]/input')).sendKeys(result.Feedback2);
                    driver.findElement(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[1]/div/div[1]/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[1]/div/div[1]/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[1]/div/div[1]/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Feedback2 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[2]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + "/tr[8]/td[2]/div/div[2]/div/div/div[1]/input")).sendKeys(result.Load2);
                    driver.findElement(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[2]/div/div[1]/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[2]/div/div[1]/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[2]/div/div[1]/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load2 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[3]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + "/tr[8]/td[2]/div/div[3]/div/div/div[1]/input")).sendKeys(result.Load2_min);
                    driver.findElement(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[3]/div/div[1]/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[3]/div/div[1]/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[3]/div/div[1]/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load2_min Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[4]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + "/tr[8]/td[2]/div/div[4]/div/div/div[1]/input")).sendKeys(result.Load2_max);
                    driver.findElement(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[4]/div/div[1]/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[4]/div/div[1]/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[8]/td[2]/div/div[4]/div/div[1]/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load2_max Voltage test');
                    });

                    //Setpoint 3
                    driver.findElement(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[1]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[1]/div/div/div[1]/input')).sendKeys(result.Feedback3);
                    driver.findElement(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[1]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[1]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[1]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Feedback3 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[2]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[2]/div/div/div[1]/input')).sendKeys(result.Load3);
                    driver.findElement(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[2]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[2]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[2]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load3 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[3]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[3]/div/div/div[1]/input')).sendKeys(result.Load3_min);
                    driver.findElement(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[3]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[3]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[3]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load3_min Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[4]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[4]/div/div/div[1]/input')).sendKeys(result.Load3_max);
                    driver.findElement(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[4]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[4]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[9]/td[2]/div/div[4]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load3_max Voltage test');
                    });
                    
                    //Setpoint 4
                    driver.findElement(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[1]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[1]/div/div/div[1]/input')).sendKeys(result.Feedback4);
                    driver.findElement(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[1]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[1]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[1]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Feedback4 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[2]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[2]/div/div/div[1]/input')).sendKeys(result.Load4);
                    driver.findElement(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[2]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[2]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[2]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load4 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[3]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[3]/div/div/div[1]/input')).sendKeys(result.Load4_min);
                    driver.findElement(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[3]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[3]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[3]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load4_min Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[4]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[4]/div/div/div[1]/input')).sendKeys(result.Load4_max);
                    driver.findElement(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[4]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[4]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[10]/td[2]/div/div[4]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load4_max Voltage test');
                    });
                    
                    //Setpoint 5
                    driver.findElement(By.xpath(rootXpath + '/tr[11]/td[2]/div/div[1]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + "/tr[11]/td[2]/div/div[1]/div/div/div[1]/input")).sendKeys(result.Feedback5);
                    driver.findElement(By.xpath(rootXpath + '/tr[11]/td[2]/div/div[1]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[11]/td[2]/div/div[1]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[11]/td[2]/div/div[1]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Feedback5 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[11]/td[2]/div/div[2]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + "/tr[11]/td[2]/div/div[2]/div/div/div[1]/input")).sendKeys(result.Load5);
                    driver.findElement(By.xpath(rootXpath + '/tr[11]/td[2]/div/div[2]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[11]/td[2]/div/div[2]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[11]/td[2]/div/div[2]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load5 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[11]/td[2]/div/div[3]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + "/tr[11]/td[2]/div/div[3]/div/div/div[1]/input")).sendKeys(result.Load5_min);
                    driver.findElement(By.xpath(rootXpath + '/tr[11]/td[2]/div/div[3]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[11]/td[2]/div/div[3]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[11]/td[2]/div/div[3]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load5_min Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + '/tr[11]/td[2]/div/div[4]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + "/tr[11]/td[2]/div/div[4]/div/div/div[1]/input")).sendKeys(result.Load5_max);
                    driver.findElement(By.xpath(rootXpath + '/tr[11]/td[2]/div/div[4]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[11]/td[2]/div/div[4]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[11]/td[2]/div/div[4]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load5_max Voltage test');
                    });
                    //---
                    //Setpoint 6
                    driver.findElement(By.xpath(rootXpath + '/tr[12]/td[2]/div/div[1]/div/div/div[1]/input')).clear();   
                    driver.findElement(By.xpath(rootXpath + '/tr[12]/td[2]/div/div[1]/div/div/div[1]/input')).sendKeys(result.Feedback6);
                    driver.findElement(By.xpath(rootXpath + '/tr[12]/td[2]/div/div[1]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[12]/td[2]/div/div[1]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[12]/td[2]/div/div[1]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Feedback6 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + "/tr[12]/td[2]/div/div[2]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[12]/td[2]/div/div[2]/div/div/div[1]/input")).sendKeys(result.Load6);
                    driver.findElement(By.xpath(rootXpath + '/tr[12]/td[2]/div/div[2]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[12]/td[2]/div/div[2]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[12]/td[2]/div/div[2]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load6 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + "/tr[12]/td[2]/div/div[3]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[12]/td[2]/div/div[3]/div/div/div[1]/input")).sendKeys(result.Load6_min);
                    driver.findElement(By.xpath(rootXpath + '/tr[12]/td[2]/div/div[3]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[12]/td[2]/div/div[3]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[12]/td[2]/div/div[3]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load6_min Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + "/tr[12]/td[2]/div/div[4]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[12]/td[2]/div/div[4]/div/div/div[1]/input")).sendKeys(result.Load6_max);
                    driver.findElement(By.xpath(rootXpath + '/tr[12]/td[2]/div/div[4]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[12]/td[2]/div/div[4]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[12]/td[2]/div/div[4]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load6_max Voltage test');
                    });
                    
                    //Setpoint 7
                    driver.findElement(By.xpath(rootXpath + "/tr[13]/td[2]/div/div[1]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[13]/td[2]/div/div[1]/div/div/div[1]/input")).sendKeys(result.Feedback7);
                    driver.findElement(By.xpath(rootXpath + '/tr[13]/td[2]/div/div[1]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[13]/td[2]/div/div[1]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[13]/td[2]/div/div[1]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Feedback7 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + "/tr[13]/td[2]/div/div[2]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[13]/td[2]/div/div[2]/div/div/div[1]/input")).sendKeys(result.Load7);
                    driver.findElement(By.xpath(rootXpath + '/tr[13]/td[2]/div/div[2]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[13]/td[2]/div/div[2]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[13]/td[2]/div/div[2]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load7 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + "/tr[13]/td[2]/div/div[3]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[13]/td[2]/div/div[3]/div/div/div[1]/input")).sendKeys(result.Load7_min);
                    driver.findElement(By.xpath(rootXpath + '/tr[13]/td[2]/div/div[3]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[13]/td[2]/div/div[3]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[13]/td[2]/div/div[3]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load7_min Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + "/tr[13]/td[2]/div/div[4]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[13]/td[2]/div/div[4]/div/div/div[1]/input")).sendKeys(result.Load7_max);
                    driver.findElement(By.xpath(rootXpath + '/tr[13]/td[2]/div/div[4]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[13]/td[2]/div/div[4]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[13]/td[2]/div/div[4]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load7_max Voltage test');
                    });
                    
                    //Setpoint 8
                    driver.findElement(By.xpath(rootXpath + "/tr[14]/td[2]/div/div[1]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[14]/td[2]/div/div[1]/div/div/div[1]/input")).sendKeys(result.Feedback8);
                    driver.findElement(By.xpath(rootXpath + '/tr[14]/td[2]/div/div[1]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[14]/td[2]/div/div[1]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[14]/td[2]/div/div[1]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Feedback8 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + "/tr[14]/td[2]/div/div[2]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[14]/td[2]/div/div[2]/div/div/div[1]/input")).sendKeys(result.Load8);
                    driver.findElement(By.xpath(rootXpath + '/tr[14]/td[2]/div/div[2]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[14]/td[2]/div/div[2]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[14]/td[2]/div/div[2]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load8 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + "/tr[14]/td[2]/div/div[3]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[14]/td[2]/div/div[3]/div/div/div[1]/input")).sendKeys(result.Load8_min);
                    driver.findElement(By.xpath(rootXpath + '/tr[14]/td[2]/div/div[3]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[14]/td[2]/div/div[3]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[14]/td[2]/div/div[3]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load8_min Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + "/tr[14]/td[2]/div/div[4]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[14]/td[2]/div/div[4]/div/div/div[1]/input")).sendKeys(result.Load8_max);
                    driver.findElement(By.xpath(rootXpath + '/tr[14]/td[2]/div/div[4]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[14]/td[2]/div/div[4]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[14]/td[2]/div/div[4]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load8_max Voltage test');
                    });
                    
                    //Setpoint 9
                    driver.findElement(By.xpath(rootXpath + "/tr[15]/td[2]/div/div[1]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[15]/td[2]/div/div[1]/div/div/div[1]/input")).sendKeys(result.Feedback9);
                    driver.findElement(By.xpath(rootXpath + '/tr[15]/td[2]/div/div[1]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[15]/td[2]/div/div[1]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[15]/td[2]/div/div[1]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Feedback9 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + "/tr[15]/td[2]/div/div[2]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[15]/td[2]/div/div[2]/div/div/div[1]/input")).sendKeys(result.Load9);
                    driver.findElement(By.xpath(rootXpath + '/tr[15]/td[2]/div/div[2]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[15]/td[2]/div/div[2]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[15]/td[2]/div/div[2]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load9 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + "/tr[15]/td[2]/div/div[3]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[15]/td[2]/div/div[3]/div/div/div[1]/input")).sendKeys(result.Load9_min);
                    driver.findElement(By.xpath(rootXpath + '/tr[15]/td[2]/div/div[3]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[15]/td[2]/div/div[3]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[15]/td[2]/div/div[3]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load9_min Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + "/tr[15]/td[2]/div/div[4]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[15]/td[2]/div/div[4]/div/div/div[1]/input")).sendKeys(result.Load9_max);
                    driver.findElement(By.xpath(rootXpath + '/tr[15]/td[2]/div/div[4]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[15]/td[2]/div/div[4]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[15]/td[2]/div/div[4]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load9_max Voltage test');
                    });
                    
                    //Setpoint 10
                    driver.findElement(By.xpath(rootXpath + "/tr[16]/td[2]/div/div[1]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[16]/td[2]/div/div[1]/div/div/div[1]/input")).sendKeys(result.Feedback10);
                    driver.findElement(By.xpath(rootXpath + '/tr[16]/td[2]/div/div[1]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[16]/td[2]/div/div[1]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[16]/td[2]/div/div[1]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Feedback10 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + "/tr[16]/td[2]/div/div[2]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[16]/td[2]/div/div[2]/div/div/div[1]/input")).sendKeys(result.Load10);
                    driver.findElement(By.xpath(rootXpath + '/tr[16]/td[2]/div/div[2]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[16]/td[2]/div/div[2]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[16]/td[2]/div/div[2]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load10 Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + "/tr[16]/td[2]/div/div[3]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[16]/td[2]/div/div[3]/div/div/div[1]/input")).sendKeys(result.Load10_min);
                    driver.findElement(By.xpath(rootXpath + '/tr[16]/td[2]/div/div[3]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[16]/td[2]/div/div[3]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[16]/td[2]/div/div[3]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load10_min Voltage test');
                    });
                    driver.findElement(By.xpath(rootXpath + "/tr[16]/td[2]/div/div[4]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[16]/td[2]/div/div[4]/div/div/div[1]/input")).sendKeys(result.Load10_max);
                    driver.findElement(By.xpath(rootXpath + '/tr[16]/td[2]/div/div[4]/div/div/label')).click();                                                            
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[16]/td[2]/div/div[4]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[16]/td[2]/div/div[4]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for Load10_max Voltage test');
                    });
                    
                    //LED3
                    driver.findElement(By.xpath(rootXpath + "/tr[17]/td[2]/div/div[1]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[17]/td[2]/div/div[1]/div/div/div[1]/input")).sendKeys(result.LED3_On);
                    driver.findElement(By.xpath(rootXpath + '/tr[17]/td[2]/div/div[1]/div/div/label')).click();
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[17]/td[2]/div/div[1]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[17]/td[2]/div/div[1]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for LED3_On test');
                    });
                    driver.findElement(By.xpath(rootXpath + "/tr[17]/td[2]/div/div[2]/div/div/div[1]/input")).clear();
                    driver.findElement(By.xpath(rootXpath + "/tr[17]/td[2]/div/div[2]/div/div/div[1]/input")).sendKeys(result.LED3_Off);
                    driver.findElement(By.xpath(rootXpath + '/tr[17]/td[2]/div/div[2]/div/div/label')).click();
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[17]/td[2]/div/div[2]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[17]/td[2]/div/div[2]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for LED3_Off test');
                    });
                    
                    //LED4
                    driver.findElement(By.xpath(rootXpath + '/tr[18]/td[2]/div/div[1]/div/div/div[1]/input')).clear();
                    driver.findElement(By.xpath(rootXpath + '/tr[18]/td[2]/div/div[1]/div/div/div[1]/input')).sendKeys(result.LED4_On);
                    driver.findElement(By.xpath(rootXpath + '/tr[18]/td[2]/div/div/div/div/label')).click();                    
                    driver.wait(until.elementLocated(By.xpath(rootXpath + '/tr[18]/td[2]/div/div[1]/div/div/div[2]/button')), 2000).then(function(){
                        driver.findElement(By.xpath(rootXpath + '/tr[18]/td[2]/div/div[1]/div/div/div[2]/button')).click();
                    }).catch(function(){
                        console.log('Could not locate submit button for LED4_On test');
                    });
                } else {
                    driver.findElement(By.xpath(rootXpath + "/tr[5]/td[2]/div/div/div/div/div[1]/button[2]")).click();
                    driver.findElement(By.xpath(rootXpath + "tr[5]/td[2]/div/div/div/div/div[2]/button")).click();
                }                                                                                
            } else {
                driver.findElement(By.xpath(rootXpath + "/tr[4]/td[2]/div/div/div/div/div[1]/button[2]")).click();
                driver.findElement(By.xpath(rootXpath + '/tr[4]/td[2]/div/div/div/div[1]/div[2]/button')).click();
            }                                

            console.log('Test completed_A9999.js');
            callbackA9999('Test completed');
        }
    }).catch(function(){
        console.log('Could not locate the child element within the time specified');
    });    
}

//driver.quit();


module.exports = {
	fillA9999
}